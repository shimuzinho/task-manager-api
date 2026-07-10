# Task Manager API

A RESTful API for managing personal tasks, built with TypeScript, Express and MongoDB. Each user can register, log in, and manage their own tasks, with authentication handled via JWT.

## Features

- User registration and login with hashed passwords (bcryptjs)
- JWT-based authentication
- Task ownership: users can only access, update, or delete their own tasks
- Full CRUD for tasks and user accounts
- Input validation via Mongoose schemas
- Consistent error handling and HTTP status codes across all endpoints

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **bcryptjs** — password hashing
- **jsonwebtoken** — authentication

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB database (local or Atlas)

### Installation

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
```

### Running the project

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the port defined in `.env`).

## API Endpoints

### Users

| Method | Route                  | Description                        | Auth required |
|--------|-------------------------|-------------------------------------|----------------|
| POST   | `/users/register`       | Register a new user                 | No             |
| POST   | `/users/login`          | Log in and receive a JWT            | No             |
| GET    | `/users/me`              | Get the authenticated user's data   | Yes            |
| PATCH  | `/users/me`              | Update username, email, or avatar   | Yes            |
| PATCH  | `/users/me/password`     | Update the current password         | Yes            |
| DELETE | `/users/me`              | Delete the authenticated user       | Yes            |

### Tasks

| Method | Route          | Description                       | Auth required |
|--------|-----------------|-------------------------------------|----------------|
| POST   | `/tasks`        | Create a new task                   | Yes            |
| GET    | `/tasks`        | List all tasks owned by the user    | Yes            |
| GET    | `/tasks/:id`    | Get a single task by ID             | Yes            |
| PATCH  | `/tasks/:id`    | Update a task                       | Yes            |
| DELETE | `/tasks/:id`    | Delete a task                       | Yes            |

> Authenticated routes require an `Authorization: Bearer <token>` header, using the token returned by `/users/login`.

## Project Structure

```
src/
├── config/          # Database connection setup
├── controllers/      # Request handling and business logic
├── middlewares/       # Authentication middleware
├── models/            # Mongoose schemas and models
├── routes/             # Route definitions
├── types/               # Custom type declarations
├── app.ts                # Express app configuration
└── server.ts              # Application entry point
```

## Author

Built by Pedro Rossini as a portfolio project.