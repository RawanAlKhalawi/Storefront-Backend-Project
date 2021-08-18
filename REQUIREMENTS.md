# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `GET /products`
- Show `GET /products/:id`
- Create `POST /products` [token required]
```
curl --location --request POST 'localhost:5000/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJFlxNHFiYzRJOUo5Sy50VEZRbzhvTXVva2pGdVZwR0xUWW5vQjlkNVNnTUlVbGdaN29NMFRtIn0sImlhdCI6MTYyOTE1NTE4NH0.mCfs_SAok1GU5iCen4VWLBmkX1-kNerNuXRS5dI7O2k' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "spring in action",
    "price": 25,
    "category": "book"
}'
```
#### Users
- Index `GET /users` [token required]
- Show `GET /users/:id` [token required]
- Create `POST /users` [token required unless the admin ]
- authenticate `POST /auth`
```
curl --location --request POST 'localhost:5000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "rawan",
    "password": "password"
}'
```

#### Orders
- Current Order `GET /orders/:id` [token required]
- Index `GET /orders` [token required]
- Update `PUT /orders/:id` [token required]
- Create `POST /orders` [token required]
- Delete `DELETE /orders/:id` [token required]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- product_id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema
```
CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64) NOT NULL
);
CREATE TYPE status_order AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id serial PRIMARY KEY,
    quantity integer,
    status status_order,
    user_id bigint REFERENCES users(id),
    product_id bigint REFERENCES products(id)
);

```