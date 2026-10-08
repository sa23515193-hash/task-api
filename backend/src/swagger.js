const swaggerJsdoc =
  require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title:
        "Task Management REST API",

      version: "1.0.0",

      description:
        "A RESTful Task Management API with JWT authentication, MongoDB and Mongoose."
    },

    servers: [
      {
        url:
          "http://localhost:5000"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        Task: {
          type: "object",

          properties: {
            title: {
              type: "string"
            },

            description: {
              type: "string"
            },

            status: {
              type: "string",
              enum: [
                "pending",
                "in-progress",
                "completed"
              ]
            },

            createdAt: {
              type: "string",
              format: "date-time"
            }
          }
        }
      }
    }
  },

  apis: [
    "./src/server.js"
  ]
};

module.exports =
  swaggerJsdoc(options);
