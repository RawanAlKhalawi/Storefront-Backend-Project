# Storefront Backend Project

## Overview

Udacity Storefront Backend Project, clone this repo and run `yarn` in your terminal at the project root.

## Technologies
The application use the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## .env file

````
POSTGRES_HOST=localhost
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
ENV=dev
SALT_ROUNDS=10
BCRYPT_PASSWORD=bcrypt-password
TOKEN_SECRET=token-secret
````

## Instructions to setup the database
### docker
`docker-compose up` 

`db-migrate up`

`docker exec -it storefront-backend-project_postgres_1 bash`

`psql -h localhost -U postgres`

need to create test database.

`CREATE DATABASE store_test;`

`\l`

`\c store_dev`

### via sql query

`CREATE USER postgres WITH PASSWORD 'password';`

`CREATE DATABASE store_dev;`

`CREATE DATABASE store_test;`

```sh
GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;
GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;
```
to create a user by endpoint 
need to add role = admin in the header

```
curl --location --request POST 'localhost:5000/users' \
--header 'role: admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "rawan",
    "last_name": "alkhalawi",
    "username": "rawan",
    "password": "password"
}'
```

## Build and run the application
`yarn`

`yarn watch`

## Test application
`yarn test`

<img width="589" alt="Screen Shot 2021-08-19 at 12 03 44 AM" src="https://user-images.githubusercontent.com/46426188/129971911-f8583a69-bfcb-432e-a472-6d4ed4beb3de.png">

## Endpoints 
[REQUIREMENTS.md](REQUIREMENTS.md).