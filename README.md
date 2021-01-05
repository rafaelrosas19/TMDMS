# TMDMS - Team Member Database Management System

## Description

This is a Node CLI application that uses the Inquirer and MySql packages to create a team member database management system. This application allows you to update ids, salaries, roles, and departments for all team members. Furthermore, it allows you to see the total expenditure per department in the business. The following prompts are available:    

                "View all employees",
                "View all employees by manager",
                "View all employees by department",
                "Search for a specific employee",
                "Add employee",
                "Remove employee",
                "Update employee role ID or salary",
                "View all departments",
                "Add department",
                "Remove department",
                "View all roles",
                "Add role",
                "Remove role",
                "View operating expenses",
                "EXIT"

## Installation

To install this respository you will need Node, Inquirer, and MySQL installed on your local machine using npm install. 

https://rafaelrosas19.github.io/

![](/assets/startup.png)
![](/assets/employees.png)


## Usage

To run the application use your integrated terminal to type `node teams.js`. The terminal will ask a series of questions to the user in order to determine the next course of action. The application will use MySQL workbench to update and change all tables inside of the `teams_db` database. 
