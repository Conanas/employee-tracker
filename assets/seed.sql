USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Warehouse"), ("Marketing");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Manager", 52000, 1),
("Sales Assistant", 48000, 1),
("Warehouse Manager", 56000, 2),
("Warehouse Asistant", 52000, 2),
("Marketing Manager", 60000, 3),
("Marketing Assistant", 56000, 3);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Tom", "Haigh", 1),
("Stevie", "Wunderbar", 3),
("Virginia", "Were-woolf", 5);

SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("JK", "Growling", 2, 1),
("Reeses", "Witterspinschten", 2, 1),
("Puffy", "Vater", 4, 3),
("Joanna", "Plumley", 4, 3),
("Angela", "Lambsbury", 6, 5),
("Douglas", "Fir", 6, 5);

SELECT * FROM employee;