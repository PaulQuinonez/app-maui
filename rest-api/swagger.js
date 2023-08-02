const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST de Compañías',
      version: '1.0.0',
      description: 'Una API REST para administrar compañías',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['src/routes/companyRoutes.js'], // Ruta al archivo de rutas que contiene los comentarios Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;