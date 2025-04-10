INSERT INTO roles 
SELECT 1, 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 1);

INSERT INTO roles
SELECT 2, 'USER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE id = 2);

DELETE FROM Users;
INSERT INTO users (id, username, password, email, role_id)
SELECT 1, 'admin', '$2a$10$2nFvSJxhBGL8ovnYD.587.8Em4EDNj6O4ugG00VteQUYs.68zqNxi', 'admin@gmail.com', 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');