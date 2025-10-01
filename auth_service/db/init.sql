CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);


INSERT INTO users
(username, "password", enabled)
VALUES('legolasblack.lothbrok', '$2a$10$tJN8SVbBrXOSUiNSbX99ue6VUxNVhobEl5FhbcBuS/vt4TgCWrKe2', true);
INSERT INTO users
(username, "password", enabled)
VALUES('Admin.Test', '$2a$10$tJN8SVbBrXOSUiNSbX99ue6VUxNVhobEl5FhbcBuS/vt4TgCWrKe2', true);
INSERT INTO users
(username, "password", enabled)
VALUES('User.Test', '$2a$10$tJN8SVbBrXOSUiNSbX99ue6VUxNVhobEl5FhbcBuS/vt4TgCWrKe2', true);

INSERT INTO roles
("name")
VALUES('ADMIN');
INSERT INTO roles
("name")
VALUES('DATA_ENTRY');

INSERT INTO public.user_roles
(user_id, role_id)
VALUES(1, 1);
INSERT INTO public.user_roles
(user_id, role_id)
VALUES(2, 1);
INSERT INTO public.user_roles
(user_id, role_id)
VALUES(3, 2);