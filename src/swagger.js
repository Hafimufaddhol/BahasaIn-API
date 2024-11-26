const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BahasaIn API Documentation',
      version: '1.0.0',
      description: 'Kumpulan dokumentasi API untuk aplikasi BahasaIn',
    },
    servers: [
      {
        url: `${process.env.URL || 'http://localhost:3000'}/api`, // Base URL dari API Anda
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Menjelaskan bahwa formatnya adalah JWT
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Terapkan BearerAuth secara global
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path ke file dengan anotasi Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
