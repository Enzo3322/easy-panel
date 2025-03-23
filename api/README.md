# Task Management API

A task management backend API using Node.js, Express, and Prisma ORM with PostgreSQL, following the hexagonal architecture pattern.

## Features

- User registration and authentication using JWT
- Team management with user roles
- Sprint planning and management
- Task management with Kanban-style status tracking
- RESTful API endpoints
- API documentation with Swagger/OpenAPI

## Architecture

This project follows the hexagonal architecture (ports and adapters) pattern:

- **Domain**: Contains business logic, entities, and repository interfaces
- **Application**: Contains use cases that orchestrate the domain
- **Adapters**: Contains controllers, validators, and middleware for the API
- **Infrastructure**: Contains implementations of repositories, database access, and the Express server

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-management-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanagement?schema=public"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run database migrations:

```bash
npx prisma migrate dev --name init
```

6. Start the server:

```bash
npm run dev
```

### Using Docker

You can also run the PostgreSQL database using Docker:

```bash
docker-compose up -d postgres
```

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the interactive documentation at:

```
http://localhost:3000/api-docs
```

This provides a user-friendly interface to explore all endpoints, request/response schemas, and even test the API directly from your browser.

### Authentication Endpoints

#### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

#### Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
  ```

### Team Endpoints

#### Create Team

- **URL**: `/api/teams`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "My Team"
  }
  ```

#### Get User Teams

- **URL**: `/api/teams`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Invite User to Team

- **URL**: `/api/teams/:teamId/invite`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "role": "member" // or "admin"
  }
  ```

### Sprint Endpoints

#### Create Sprint

- **URL**: `/api/sprints`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "Sprint 1",
    "startDate": "2023-01-01T00:00:00.000Z",
    "endDate": "2023-01-15T00:00:00.000Z",
    "teamId": "team-uuid"
  }
  ```

#### Get Sprints by Team

- **URL**: `/api/sprints/team/:teamId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

### Task Endpoints

#### Create Task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "TO_DO", // Optional, defaults to "TO_DO"
    "teamId": "team-uuid",
    "sprintId": "sprint-uuid", // Optional
    "assigneeId": "user-uuid", // Optional
    "startDate": "2023-01-01T00:00:00.000Z", // Optional
    "endDate": "2023-01-15T00:00:00.000Z" // Optional
  }
  ```

#### Update Task Status (Kanban)

- **URL**: `/api/tasks/:taskId/status`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "IN_PROGRESS" // or "TO_DO" or "DONE"
  }
  ```

#### Get Tasks by Team

- **URL**: `/api/tasks/team/:teamId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Get Tasks by Status (Kanban Column)

- **URL**: `/api/tasks/team/:teamId/status/:status`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

## License

MIT 