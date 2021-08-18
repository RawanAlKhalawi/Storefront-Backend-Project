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
- Create `POST /orders` [token required]

#### Order_Products
- Update `PUT /orders/:id/products` [token required]
- Delete `DELETE /orders/:id/products` [token required]
- Add Product `POST /orders/:id/products` [token required]
```
curl --location --request DELETE 'localhost:5000/orders/1/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoicmF3YW4iLCJsYXN0X25hbWUiOiJhbGtoYWxhd2kiLCJ1c2VybmFtZSI6InJhd2FuIiwicGFzc3dvcmQiOiIkMmIkMTAkOE9UOS9NQVM1RlNOcEV1NThjSjBzLnN4Und5cmFLcTlCWjJLUVFnMHlnMnRPdjZVNXVTcksifSwiaWF0IjoxNjI5MjU4MTMwfQ.V4w4zeJUfK75wpZ-eity2vIkgZ1wV9_6Yccn8vuKm7w' \
--header 'Content-Type: application/json' \
--data-raw '{
    "quantity": 3,
    "product_id": "1"
}'
```
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
- user_id
- status of order (active or complete)

#### Order_Products
- id
- quantity of each product in the order
- product_id of each product in the order
- order_id

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
    status status_order,
    user_id bigint REFERENCES users(id)
);
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```