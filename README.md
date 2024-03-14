# Task Manager API

This is a RESTful API built with Node.js that allows users to manage their daily tasks securely. The API includes user authentication and utilizes MongoDB for data storage.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Get All Tasks](#get-all-tasks)
  - [Create a Task](#create-a-task)
  - [Get a Task](#get-a-task)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
- [API Endpoints In Postman](#api-endpoints-in-postman)
- [Notes](#notes)
  - [Changing The Environment](#changing-the-environment)
## Requirements

To run this project, you will need:

- Node.js
- MongoDB

## Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your machine.

### Installation
1. Clone the repository:

```bash
git clone https://github.com/MohammadDAlil0/Task-Manager
```
2. Install dependencies:
```bash
cd task-manager
npm install
```
3. Set up environment variables:

Create a config.env file in the root directory of the project and provide the following variables: 
```bash
DATABASE_LOCAL=mongodb://127.0.0.1:27017/TaskManager
MONGODB_URI=your-mongodb-uri
MONGODB_KEY=your-mongodb-password
PORT=3000
JWT_SECRET=your-secret-key
JWT_EXPIRE_IN=your-JWT-expire-date
NODE_ENV=your-environment-state
```
4. Start the server:
```bash
npm start
```
The server should now be running on http://localhost:3000.

## API Endpoints

### User Registration

- URL: `/users/register`
- Method: `POST`
- Description: Registers a new user with a username and password.

#### Request

The request body should be in JSON format and include the following fields:

```json
{
  "username": "Mohammaddalil",
  "password": "password123",
  "confirmPassword": "password123"
}
```
### Success Response
- Status Code: 201 (Created)
- Response Body:
```json
{
  "status": "success",
  "token": "JWT-Token"
  "data": "User's Data"
}
```

### User Login

- URL: `/users/login`
- Method: `POST`
- Description: Authenticates a user and returns a token.

#### Request

The request body should be in JSON format and include the following fields:

```json
{
  "username": "Mohammaddalil",
  "password": "password123"
}
```
### Success Response
- Status Code: 200 (OK)
- Response Body:
```json
{
  "status": "success",
  "token": "JWT-Token"
  "data": "User's Data"
}
```
### Get All Tasks

- URL: `/tasks`
- Method: `GET`
- Description: Retrieves a list of all tasks for the authenticated user.
- Authentication: Include the JWT token in the Authorization header.

### Success Response:
- Status Code: 200 (OK)
- Response Body:
```json
{
  "status": "success",
  "result": "number-of-tasks"
  "data": "tasks"
}
```

### Create a Task
- URL: `/tasks`
- Method: `POST`
- Description: Adds a new task for the authenticated user.
- Authentication: Include the JWT token in the Authorization header.

### Request Body:
```json
{
  "title": "New Task",
  "description": "This is a new task"
}
```
### Success Response:
- Status Code: 201 (Created)
- Response Body:
```json
{
  "status": "success",
  "data": "task's data"
}
```
### Get a Task
- URL: `/tasks/:taskId`
- Method: `GET`
- Description: Retrieves the details of a specific task by its ID for the authenticated user.
- Authentication: Include the JWT token in the Authorization header.

### Success Response:
- Status Code: 200 (OK)
- Response Body:
```json
{
  "status": "success",
  "data": "task's data"
}
```

### Update a Task
- URL: `/tasks/:taskId`
- Method: `PUT`
- Description: Update the details of a specific task by its ID for the authenticated user.
- Authentication: Include the JWT token in the Authorization header.

### Request Body:
```json
{
  "title": "New Task",
  "description": "This is a new task"
}
```

### Success Response:
- Status Code: 200 (OK)
- Response Body:
```json
{
  "status": "success",
  "data": "task's data"
}
```

### Delete a Task
- URL: `/tasks/:taskId`
- Method: `DELETE`
- Description: Delete a specific task by its ID for the authenticated user.
- Authentication: Include the JWT token in the Authorization header.

### Success Response:
- Status Code: 204 (DELETED)

### API Endpoints In Postman
You can use and see the APIs using Postman using this link: https://documenter.getpostman.com/view/27420685/2sA2xmTq3N

### Notes

- Changing The Environment: You can set NODE_ENV to be equal to developer or to be equal to production. developer environment will connect to a local database, while the production environmet will connect to an online database(your cluster in mongodb).
