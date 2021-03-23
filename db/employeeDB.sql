DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT not NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("Premedia");
INSERT INTO department (name)
VALUES ("Production");
INSERT INTO department (name)
VALUES ("Digital");
INSERT INTO department (name)
VALUES ("Finance");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000.00, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Manager", 90000.00, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Manager", 85000.00, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Associate", 65000.00, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 105000.00, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rick", "Prue", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clara", "Renauro", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Drew", "Yearian", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Grimstead", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jamie", "Melo", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brad", "Scharff", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Linda", "Luke", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Al", "Spinelli", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carrie", "Mallie", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angel", "Mass", 5, 1);

SELECT * FROM employee;