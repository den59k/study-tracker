CREATE EXTENSION pgcrypto;

-- Пользователи
CREATE TABLE users (
	id serial PRIMARY KEY,
	name text,
	email text UNIQUE,
	password bytea
);

CREATE TABLE refresh_tokens (
	user_id int,
	token text PRIMARY KEY,
	timestamp bigint
);

-- INSERT INTO users VALUES (DEFAULT, 'root', 'root@mail.ru', digest('123123', 'sha1'))