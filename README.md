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

Create a .env file in the root directory of the project and provide the following variables: 
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secret-key
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
  "password": "password123"
}
```
### Success Response
- Status Code: 201 (Created)
- Response Body:
```json
{
  "status": "success",
  "token": JWT-Token
  "data": User's Data
}
```
This endpoint allows you to register a new user by sending a POST request to /users/register with the required information in the request body. Upon successful registration, a response with a status code of 201 (Created) and a JSON body containing a success message with a JWT token.
