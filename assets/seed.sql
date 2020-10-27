USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Warehouse"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Manager", 52000, 1),
("Sales Assistant", 48000, 1),
("Warehouse Manager", 56000, 2),
("Warehouse Asistant", 52000, 2),
("Marketing Manager", 60000, 3),
("Marketing Assistant", 56000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Tom", "Haigh", 1),
("Atticus", "Finch", 3),
("Huckleberry", "Finn", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Harry", "Potter", 2, 1),
("Miss", "Havisham", 2, 1),
("Sherlock", "Holmes", 4, 2),
("Boo", "Radley", 4, 2),
("White", "Fang", 6, 3),
("Frodo", "Baggins", 6, 3);