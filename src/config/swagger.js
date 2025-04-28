const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

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
        url: `${'http://localhost:8080'}/api`, // Base URL dari API Anda
        description: 'Local development server',
      },      {
        url: `${process.env.URL}/api`, // Base URL dari API Anda
        description: 'online development server',
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
  apis: ['./src/routes/**/*.js'], // Path ke file dengan anotasi Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
