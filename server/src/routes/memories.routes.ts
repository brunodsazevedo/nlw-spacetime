import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get(
    '/memories',
    {
      schema: {
        description: 'Lista todas as memórias cadastradas pelo usuário logado',
        summary: 'Lista de memórias',
        tags: ['Memories'],
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                coverUrl: { type: 'string' },
                excerpt: { type: 'string' },
                createdAt: { type: 'string' },
              },
            },
          },
          401: {
            description: 'Bad credentials',
            type: 'null',
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request) => {
      const memories = await prisma.memory.findMany({
        where: {
          userId: request.user.sub,
        },
        orderBy: {
          createdAt: 'asc',
        },
      })

      return memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 115).concat('...'),
          createdAt: memory.createdAt,
        }
      })
    },
  )

  app.get(
    '/memories/:id',
    {
      schema: {
        description: 'Lista todas as memórias cadastradas pelo usuário logado',
        summary: 'Lista de memórias',
        tags: ['Memories'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID de memória',
            },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string' },
              coverUrl: { type: 'string' },
              content: { type: 'string' },
              isPublic: { type: 'boolean' },
              createdAt: { type: 'string' },
            },
          },
          401: {
            description: 'Bad credentials',
            type: 'null',
          },
          404: {
            description: 'Not found',
            type: 'null',
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (!memory.isPublic && memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      return memory
    },
  )

  app.post(
    '/memories',
    {
      schema: {
        description: 'Rota responsável pelo cadastro de memória do usuário',
        summary: 'Cadastro de memória',
        tags: ['Memories'],
        body: {
          type: 'object',
          properties: {
            coverUrl: { type: 'string' },
            content: { type: 'string' },
            isPublic: { type: 'boolean' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string' },
              coverUrl: { type: 'string' },
              content: { type: 'string' },
              isPublic: { type: 'boolean' },
              createdAt: { type: 'string' },
            },
          },
          401: {
            description: 'Bad credentials',
            type: 'null',
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request) => {
      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      })

      const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

      const memory = await prisma.memory.create({
        data: {
          content,
          coverUrl,
          isPublic,
          userId: request.user.sub,
        },
      })

      return memory
    },
  )

  app.put(
    '/memories/:id',
    {
      schema: {
        description: 'Rota responsável por editar memória de usuário',
        summary: 'Edição de memória',
        tags: ['Memories'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID de memória',
            },
          },
        },
        body: {
          type: 'object',
          properties: {
            coverUrl: { type: 'string' },
            content: { type: 'string' },
            isPublic: { type: 'boolean' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string' },
              coverUrl: { type: 'string' },
              content: { type: 'string' },
              isPublic: { type: 'boolean' },
              createdAt: { type: 'string' },
            },
          },
          401: {
            description: 'Bad credentials',
            type: 'null',
          },
          404: {
            description: 'Not found',
            type: 'null',
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      })

      const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

      let memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      memory = await prisma.memory.update({
        where: {
          id,
        },
        data: {
          content,
          coverUrl,
          isPublic,
        },
      })

      return memory
    },
  )

  app.delete(
    '/memories/:id',
    {
      schema: {
        description: 'Rota responsável por deletar memória de usuário',
        summary: 'Exclui memória',
        tags: ['Memories'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID de memória',
            },
          },
        },
        response: {
          204: {
            description: 'Successful and no content response',
            type: 'null',
          },
          401: {
            description: 'Bad credentials',
            type: 'null',
          },
          404: {
            description: 'Not found',
            type: 'null',
          },
          500: {
            description: 'Internal server error',
            type: 'null',
          },
        },
      },
    } as any,
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        },
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      await prisma.memory.delete({
        where: {
          id,
        },
      })

      return reply.status(204).send()
    },
  )
}
