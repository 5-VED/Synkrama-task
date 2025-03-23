# Book Management API

This repository contains a RESTful API for managing books, users, and roles. The application is built with TypeScript and appears to use Express.js as the web framework and MongoDB with Mongoose for data storage.

## Features

- **User Management**
  - User registration (signup) with JWT authentication
  - Role-based access control

- **Book Management**
  - Add new books to the library
  - Retrieve book details along with pagination.
  - Delete books from the library
  - Get books from the library by ID

- **Role Management**
  - Create new roles
  - Delete existing roles
  - Get all roles


## Data Validation

The API uses Joi for data validation:

- **Book validation**:
  - Title: String, 3-255 characters, required
  - Author: String, 3-255 characters, required
  - Year: Integer, between 1000 and current year, required
  - Genre: String, 3-100 characters, required

## Error Handling

The API provides detailed error messages for various scenarios:
- Invalid input data
- Resource not found
- Duplicate entries
- Server errors

## Authentication and Authorization

- JWT (JSON Web Token) based authentication
- Role-based access control for protected endpoints

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository
```bash
git clone https://github.com/5-VED/Synkrama-task.git
```

2. Install dependencies
```bash
cd Synkrama-task
npm install
```

3. Set up environment variables (create a .env file) same as .env.example
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/book-management
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN = 24h 
```

## Development
4. Start the server for development
```bash
npm start:dev
```

## Production
```bash
npm run build
npm run start
```

## API Testing with Postman
- Import the provided Postman collection and environment files into your Postman app.
- Configure the environment variables in the Postman environment.
- Start the server (npm start) and use the API endpoints as needed.

## Author
[VED PARMAR]