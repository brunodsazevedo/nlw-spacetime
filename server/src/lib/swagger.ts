export const swaggerOptions = {
  openapi: {
    info: {
      title: 'NLW Spacetime API',
      description:
        'App API RESTful com propósito de criar e armazenar memórias',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
    tags: [{ name: 'Auth' }, { name: 'Memories' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    externalDocs: {
      description: 'Repositório Github aqui',
      url: 'https://github.com/brunodsazevedo/nlw-spacetime',
    },
  },
}
