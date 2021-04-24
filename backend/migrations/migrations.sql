CREATE EXTENSION pgcrypto;

-- Пользователи
CREATE TYPE user_role AS ENUM ('root', 'teacher', 'student');

CREATE TABLE users (
	id serial PRIMARY KEY,
	email text UNIQUE,
	info jsonb,
	password bytea,
	role user_role
);

CREATE TABLE refresh_tokens (
	user_id int, FOREIGN KEY (user_id) REFERENCES users (id),
	token text PRIMARY KEY,
	timestamp bigint
);

-- INSERT INTO users VALUES (DEFAULT, 'root@mail.ru', '{"name": "root", "surname": "root"}', digest('123123', 'sha1'), 'root')

-- Все остальное
CREATE TABLE subjects (
	id serial PRIMARY KEY,
	teacher_id int, FOREIGN KEY (teacher_id) REFERENCES users (id),
	title text
);

CREATE TABLE groups (
	id serial PRIMARY KEY,
	title text,
	info jsonb
)

CREATE TYPE subject_status AS ENUM ('active', 'completed');

CREATE TABLE groups_subjects (
	group_id int, FOREIGN KEY (group_id) REFERENCES groups (id),
	subject_id int, FOREIGN KEY (subject_id) REFERENCES subjects (id),
	status subject_status DEFAULT 'active',
	PRIMARY KEY (group_id, subject_id)
);

CREATE TYPE mark_type AS ENUM ('mark', 'binary');

CREATE TABLE works (
	id serial PRIMARY KEY,
	title text,
	subject_id int, FOREIGN KEY (subject_id) REFERENCES subjects (id),
	info jsonb,
	mark_type mark_type
);

-- История с коммитами

CREATE TABLE commits (
	id bigserial PRIMARY KEY,
	work_id int, FOREIGN KEY (work_id) REFERENCES works (id),
	student_id int, FOREIGN KEY (student_id) REFERENCES users (id),
	user_id int, FOREIGN KEY (user_id) REFERENCES users (id),
	text text,
	files jsonb [],
	timestep bigint,
	mark smallint
);