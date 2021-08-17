CREATE TYPE status_order AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id serial PRIMARY KEY,
    quantity integer,
    status status_order,
    user_id bigint REFERENCES users(id),
    product_id bigint REFERENCES products(id)
);