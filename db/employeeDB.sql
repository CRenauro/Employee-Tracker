DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NULL,
    CONSTRAINT FOREIGN KEY (role_id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    CONSTRAINT FOREIGN KEY (role_id)
    
);

SELECT * FROM employeeDB;



-- A FOREIGN KEY is a key used to link two tables together.
-- A FOREIGN KEY is a field (or collection of fields) in one table that refers to the PRIMARY KEY in another table.
-- The table containing the foreign key is called the child table, and the table containing the candidate key is called the referenced or parent table.
--foreign key constraint


-- Everyone iv run into this issue with 2 Sep Groups when creating your tables NOT NULL needs to go LAST
-- You cannot do NOT NULL UNSIGNED

-- Hint: For the employee table manager_id and employee_id are whats being connected