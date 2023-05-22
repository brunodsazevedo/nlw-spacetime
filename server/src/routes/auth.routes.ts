import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { prisma } from '../lib/prisma'

interface RegisterTypeProps {
  type?: 'web' | 'mobile'
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        description:
          'Com o login realizado pelo Oauth de Github, informe o "code" retornado pelo callback para efetuar o cadastro/login para obter JWT token da aplicação',
        summary: 'Cadastro/login com Oauth de Github',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            code: { type: 'string' },
          },
        },
        security: [],
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          400: {
            description: 'Bad request',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 400 },
              code: { type: 'string' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
          401: {
            description: 'Bad credentials',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: '401' },
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request, reply) => {
      try {
        const { type = 'web' } = request.query as RegisterTypeProps

        const bodySchema = z.object({
          code: z.string(),
        })

        const { code } = bodySchema.parse(request.body)

        const GITHUB_CLIENT_ID =
          type === 'mobile'
            ? process.env.GITHUB_MOBILE_CLIENT_ID
            : process.env.GITHUB_WEB_CLIENT_ID

        const GITHUB_CLIENT_SECRET =
          type === 'mobile'
            ? process.env.GITHUB_MOBILE_CLIENT_SECRET
            : process.env.GITHUB_WEB_CLIENT_SECRET

        const accessTokenResponse = await axios.post(
          'https://github.com/login/oauth/access_token',
          null,
          {
            params: {
              client_id: GITHUB_CLIENT_ID,
              client_secret: GITHUB_CLIENT_SECRET,
              code,
            },
            headers: {
              Accept: 'application/json',
            },
          },
        )

        const { access_token } = accessTokenResponse.data

        const userResponse = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })

        const userSchema = z.object({
          id: z.number(),
          login: z.string(),
          name: z.string(),
          avatar_url: z.string().url(),
        })

        const userInfo = userSchema.parse(userResponse.data)

        let user = await prisma.user.findUnique({
          where: {
            githubId: userInfo.id,
          },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              githubId: userInfo.id,
              login: userInfo.login,
              name: userInfo.name,
              avatarUrl: userInfo.avatar_url,
            },
          })
        }

        const token = app.jwt.sign(
          {
            name: user.name,
            avatarUrl: user.avatarUrl,
          },
          {
            sub: user.id,
            expiresIn: '30 days',
          },
        )

        return { token }
      } catch (error) {
        if (error instanceof AxiosError) {
          const statusCode = error.response?.status!
          const message = error.response?.data.message!

          return reply.status(statusCode).send({
            statusCode,
            message,
          })
        }

        return reply.send(error)
      }
    },
  )
}
