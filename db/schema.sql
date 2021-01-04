DROP DATABASE IF EXISTS teams_db;
CREATE DATABASE teams_db;

USE teams_db;

CREATE TABLE departments (
  dept_id INTEGER NOT NULL,
  dept_name VARCHAR(30),
  PRIMARY KEY (dept_id)
);

CREATE TABLE roles (
  role_id INTEGER NOT NULL,
  title VARCHAR(30),
  dept_id INTEGER NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employees (
  emp_id INTEGER NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER NOT NULL,
  salary INTEGER(11),
  PRIMARY KEY (emp_id)
);

CREATE TABLE dept_managers (
  emp_id INTEGER NOT NULL,
  dept_id INTEGER NOT NULL,
);