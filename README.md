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

## Build and run the application
`yarn`

`docker-compose up`  for start the postgres

`db-migrate up`

`yarn watch`

## Test application
`yarn test`

<img width="661" alt="Screen Shot 2021-08-17 at 11 01 51 PM" src="https://user-images.githubusercontent.com/46426188/129792575-296ca0cb-4549-4d39-b9e6-3fd5d7384d88.png">

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
## Endpoints 
[REQUIREMENTS.md](REQUIREMENTS.md).