CREATE TYPE status_order AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id serial PRIMARY KEY,
    status status_order,
    user_id bigint REFERENCES users(id)
);