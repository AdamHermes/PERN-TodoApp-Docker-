CREATE DATABASE perntodo;
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    upassword VARCHAR(255)
);
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (sid)
);

CREATE INDEX "IDX_session_expire" ON session(expire);
