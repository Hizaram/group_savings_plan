# GROUP SAVINGS PLAN

## Description
A simple savings plan backend system built in Typescrpt that allows users create saving plans and invite registered friends to join.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Testing](#testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Hizaram/group_savings_plan.git
```
2. Install dependencies:
```bash
npm install
```
## Usage

### Configuration
- Create a MYSQL database

- Configure the database connection in the `ormconfig.json` file:
```json
{
  "name": "default",
  "type": "mysql",
  "host": "name_of_mysql_host",
  "port": port_number,
  "username": "mysql_username",
  "password": "mysql_password",
  "database": "mysql_db_name",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entities/*.ts"],
  "subscribers": ["src/subscriber/*.ts"],
  "migrations": ["src/migration/*.ts"],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

- Generate a secret key for JWT authentication and set its expiry time in the `.env` file:
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN="time"
```

## ENDPOINTS
### Fetch a Plan:
- Method: GET
- URL: `http://localhost:3000/api/saving-plan/{plan_id}`
### Register a User:
- Method: POST
- URL: `http://localhost:3000/api/auth/signup`
- Body (raw JSON);
```json
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password",
}
```
### Login (To get JWToken):
- Method: POST
- URL: `http://localhost:3000/api/auth/login`
- Body (raw JSON);
```json
{
  "email": "your_registered_email",
  "password": "your_password"
}
```
### Create Savings Plan (Protected)
- Method: POST
- URL: `http://localhost:3000/api/saving-plan/create`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
  "name": "",
  "description": "",
  "targetAmount": Number
}
```
### Send Invites (Protected)
- Method: POST
- URL: `http://localhost:3000/api/user/invite/{plan_id}`
- Headers:
  * `Content-Type: application/json`
  * `Authorization: Bearer {your_jwtoken}`
- Body (raw JSON):
```json
{
 "userId": Number,
 "planId": Number,
 "friendsId": []
}
```

## Authentication
This project uses JWT for authentication. Make sure to include the JWT token in the `Authorization` header for protected routes.

## Testing
Testing is done through Postman or cURL