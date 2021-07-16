# INCIDENT REPORTING API

[Postman Documentation](https://documenter.getpostman.com/view/11075743/TzmBDtkG)

[Postman Collection](https://www.getpostman.com/collections/40a495fe3c3a25cd5ad4)

## Features

- **[Typescript](https://www.typescriptlang.org/)**: JavaScript and More

- **PostgreSQL database**: [PostgreSQL](https://www.postgresql.org/)

- **Authentication and authorization**: using [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)

- **Validation**: request data validation using [express-validator](https://express-validator.github.io/docs/)

- **Testing**: unit and integration tests using [Jest](https://jestjs.io)

- **Error handling**: centralized error handling mechanism

- **API documentation**: with [Postman API Documentation Tool](https://www.postman.com/api-documentation-tool/)

- **Dependency management**: with [npm](https://www.npmjs.com/)

- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Getting Started

### Installation

Clone the repo:

```bash

git clone https://github.com/rilwanmajaagun/incident-report.git

```

Install the dependencies:

```bash

npm install

```

Set the environment variables:

```bash

cp .env.example

INCIDENT_REPORT_DEV_DATABASE_URL=
INCIDENT_REPORT_SECRET=
INCIDENT_REPORT_TEST_DATABASE_URL=
WEATHER_API_TEST_KEY=
WEATHER_API_DEV_KEY=


# Add to .env file.

```

### Commands

Run the app:
```bash

npm run dev

```


# API Documentation

## Indices

- [Auth](#auth)

  - [Register Client](#1-register-api)
  - [Login API](#2-login-api)


- [Incident](#incident)

  - [Create Incident Report](#1-create-incident-report-api)
  - [Fetch All Incident API](#2-fetch-all-incident-api)
---

## Auth

Authentication API

### 1. Register API

An api that lets an authenticated client create a new account

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/v1/auth/register
```

**_Body:_**

```js
{
    "first_name": "John",
    "last_name": "Joe",
    "email": "JhonJoe@mail.com",
    "password": "12345789"
}
```
**_More example Requests/Responses:_**

##### I. Example Request: /auth/register - Success Response

**_Body:_**

```js
{
    "first_name": "John",
    "last_name": "Joe",
    "email": "JhonJoe@mail.com",
    "password": "12345789"
}
```

##### I. Example Response: /auth/register - Success Response

```js
{
    "status": "success",
    "message": "Client created successfully",
    "data": {
        "id": 11,
        "first_name": "Jayson",
        "last_name": "Skiles",
        "email": "wilford_collier31@hotmail.com",
        "is_active": false,
        "created_at": "2021-07-16T02:58:46.422Z",
        "updated_at": "2021-07-16T02:58:46.422Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2lsZm9yZF9jb2xsaWVyMzF"
    }
}
```

**_Status Code:_** 201
<br>

### 2. Login API

This API allows you to obtain a short-lived access tokens which you can use to authenticate requests to other services. Access Tokens expire after 30 minutes while Refresh Token expires after 30 days.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/v1/auth/login
```

**_Body:_**

```js
{
    "email": "admin@mail.com",
    "password": "12345678"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: /auth/login - Success Response

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password"
}
```

##### I. Example Response: /auth/login - Success Response

```js
{
    "status": "success",
    "message": "Client logged in successfully",
    "data": {
        "id": 11,
        "first_name": "Jayson",
        "email": "wilford_collier31@hotmail.com",
        "is_active": false,
        "created_at": "2021-07-16T02:58:46.422Z",
        "updated_at": "2021-07-16T02:58:46.422Z",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoid2lsZm9yZF9jb2xsaWVyMzFAaG90bWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSmF5c29uIiwiaWF0IjoxNjI2NDA0MzcwLCJleHAiOjE2MjY0OTA3NzB9.Tak4IAm5gw5a3cdwdB8RiicFNE74spRlvD-mkW3Lwb8"
    }
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: /auth/login - Unauthorized Error

**_Body:_**

```js
{
    "email": "email@example.com",
    "password": "password"
}
```

##### II. Example Response: /auth/login - Unauthorized Error

```js
{
    "status": "fail",
    "message": "Incorrect login details"
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: /auth/login - Bad Request Error

**_Body:_**

```js
{
    "email": "admin@mail.com"
}
```

##### III. Example Response: /auth/login - Bad Request Error

```js
{
    "status": "fail",
    "message": "",
    "errors": [
        {
            "password": "must be at least 5 chars long"
        }
    ]
}
```

**_Status Code:_** 400

<br>

## incident

Incident Api

### 1. Create Incident Report Api

This API allows authenticated client create incident report

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/v1/incident
```

**_Body:_**

```js
{ 
     "incident_desc": "A ratione facilis id aperiam dolorem omnis et. Est sint optio aliquid reprehenderit voluptatibus autem beatae a. Quaerat dolorum dolorum libero quisquam sint culpa alias dolorum totam. Labore optio unde. Veritatis suscipit hic aut sed dolores ab",
      "city": "El Cajon", 
      "country": "US", 
      "date": "2020-10-02"
}
```

**_More example Requests/Responses:_**

##### I.  Example Response: /incident - Success Response

**_Body:_**

```js
{ 
     "incident_desc": "A ratione facilis id aperiam dolorem omnis et. Est sint optio aliquid reprehenderit voluptatibus autem beatae a. Quaerat dolorum dolorum libero quisquam sint culpa alias dolorum totam. Labore optio unde. Veritatis suscipit hic aut sed dolores ab",
      "city": "El Cajon", 
      "country": "US", 
      "date": "2020-10-02"
}
```

##### I. Example Response: /incident - Success Response

```js
{
    "status": "success",
    "message": "Incident Reports created successfully",
    "data": [
        {
            "id": "incident-b4a93dc6961b4",
            "client_id": 11,
            "incident_desc": "A ratione facilis id aperiam dolorem omnis et. Est sint optio aliquid reprehenderit voluptatibus autem beatae a. Quaerat dolorum dolorum libero quisquam sint culpa alias dolorum totam. Labore optio unde. Veritatis suscipit hic aut sed dolores ab.",
            "city": "El Cajon",
            "country": "San Marino",
            "date": "2020-10-01T23:00:00.000Z",
            "weather_report": {
                "coord": {
                    "lon": -116.9625,
                    "lat": 32.7948
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 294.33,
                    "feels_like": 294.36,
                    "temp_min": 291.74,
                    "temp_max": 299.25,
                    "pressure": 1013,
                    "humidity": 71
                },
                "visibility": 10000,
                "wind": {
                    "speed": 2.24,
                    "deg": 22,
                    "gust": 3.58
                },
                "clouds": {
                    "all": 1
                },
                "dt": 1626404433,
                "sys": {
                    "type": 2,
                    "id": 2006325,
                    "country": "US",
                    "sunrise": 1626353437,
                    "sunset": 1626404200
                },
                "timezone": -25200,
                "id": 5345529,
                "name": "El Cajon",
                "cod": 200
            },
            "created_at": "2021-07-16T03:00:33.962Z",
            "updated_at": "2021-07-16T03:00:33.962Z"
        }
    ]
}
```

**_Status Code:_** 201

<br>

### 2. Fetch All Incident Api

Fetch all incident report.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: localhost:5000/api/v1/incident
```

**_More example Requests/Responses:_**

##### I. Example Response: /incident - Success Response

```js
{
    "status": "success",
    "message": "Incident Reports fetched successfully",
    "data": [
        {
            "client_id": 11,
            "incident_desc": "A ratione facilis id aperiam dolorem omnis et. Est sint optio aliquid reprehenderit voluptatibus autem beatae a. Quaerat dolorum dolorum libero quisquam sint culpa alias dolorum totam. Labore optio unde. Veritatis suscipit hic aut sed dolores ab.",
            "city": "El Cajon",
            "country": "San Marino",
            "date": "2020-10-01T23:00:00.000Z",
            "weather_report": {
                "coord": {
                    "lon": -116.9625,
                    "lat": 32.7948
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 294.33,
                    "feels_like": 294.36,
                    "temp_min": 291.74,
                    "temp_max": 299.25,
                    "pressure": 1013,
                    "humidity": 71
                },
                "visibility": 10000,
                "wind": {
                    "speed": 2.24,
                    "deg": 22,
                    "gust": 3.58
                },
                "clouds": {
                    "all": 1
                },
                "dt": 1626404433,
                "sys": {
                    "type": 2,
                    "id": 2006325,
                    "country": "US",
                    "sunrise": 1626353437,
                    "sunset": 1626404200
                },
                "timezone": -25200,
                "id": 5345529,
                "name": "El Cajon",
                "cod": 200
            },
            "created_at": "2021-07-15T23:00:00.000Z",
            "updated_at": "2021-07-15T23:00:00.000Z"
        }
    ]
}
```

**_Status Code:_** 200

<br>


---

[Back to top](#1-register-api)
