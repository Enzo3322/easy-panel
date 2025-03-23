const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for Task and Project Management with Hexagonal Architecture',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID (UUID)',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (hashed)',
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID (UUID)',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/UserResponse',
            },
            token: {
              type: 'string',
              description: 'JWT authentication token',
            },
          },
        },
        Team: {
          type: 'object',
          required: ['id', 'name', 'creatorId'],
          properties: {
            id: {
              type: 'string',
              description: 'Team ID (UUID)',
            },
            name: {
              type: 'string',
              description: 'Team name',
            },
            creatorId: {
              type: 'string',
              description: 'Creator user ID (UUID)',
            },
          },
        },
        UserTeam: {
          type: 'object',
          required: ['id', 'userId', 'teamId', 'role'],
          properties: {
            id: {
              type: 'string',
              description: 'UserTeam ID (UUID)',
            },
            userId: {
              type: 'string',
              description: 'User ID (UUID)',
            },
            teamId: {
              type: 'string',
              description: 'Team ID (UUID)',
            },
            role: {
              type: 'string',
              enum: ['admin', 'member'],
              description: 'User role in the team',
            },
          },
        },
        Sprint: {
          type: 'object',
          required: ['id', 'name', 'startDate', 'endDate', 'teamId'],
          properties: {
            id: {
              type: 'string',
              description: 'Sprint ID (UUID)',
            },
            name: {
              type: 'string',
              description: 'Sprint name',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Sprint start date',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Sprint end date',
            },
            teamId: {
              type: 'string',
              description: 'Team ID (UUID)',
            },
          },
        },
        Task: {
          type: 'object',
          required: ['id', 'title', 'description', 'status', 'teamId'],
          properties: {
            id: {
              type: 'string',
              description: 'Task ID (UUID)',
            },
            title: {
              type: 'string',
              description: 'Task title',
            },
            description: {
              type: 'string',
              description: 'Task description',
            },
            status: {
              type: 'string',
              enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
              description: 'Task status',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Task start date (optional)',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Task end date (optional)',
            },
            assigneeId: {
              type: 'string',
              nullable: true,
              description: 'Assignee user ID (UUID) (optional)',
            },
            sprintId: {
              type: 'string',
              nullable: true,
              description: 'Sprint ID (UUID) (optional)',
            },
            teamId: {
              type: 'string',
              description: 'Team ID (UUID)',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/infrastructure/http/routes/*.js',
    './src/infrastructure/http/swagger/*.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs; 