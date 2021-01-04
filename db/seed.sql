USE teams_db;

DELETE FROM departments;
DELETE FROM dept_managers;
DELETE FROM employees;
DELETE FROM roles;

INSERT INTO departments (dept_id, dept_name)
VALUES (001, "Front of House"),(002, "Back of House");

INSERT INTO roles (role_id, title, dept_id)
VALUES (2010, "Executive Chef", 002),(2055, "Sommelier", 001);

INSERT INTO employees (emp_id, first_name, last_name, role_id, salary)
VALUES (10001, "David", "Chang", 2010, 100000), (10052, "Arthur", "Wine", 2055, 80000);

INSERT INTO dept_managers (emp_id, dept_id)
VALUES (10001, 002), (10052, 001);



