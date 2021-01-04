const mysql = require("mysql");
const inquirer = require("inquirer");
const { result, update } = require("lodash");
const cTable = require('console.table');
const RawListPrompt = require("inquirer/lib/prompts/rawlist");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "teams_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
})

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
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
                "View operating expenses"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    empAll();
                    break;

                case "View all employees by manager":
                    empMng2();
                    break;

                case "View all employees by department":
                    empDep();
                    break;

                case "Search for a specific employee":
                    empSearch();
                    break;

                case "Add employee":
                    addEmp();
                    break;

                case "Remove employee":
                    removeEmp();
                    break;

                case "Update employee info":
                    updateEmp();
                    break;

                case "View all departments":
                    viewDep();
                    break;

                case "Add department":
                    addDep();
                    break;

                case "Remove department":
                    removeDep();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Remove role":
                    removeRole();
                    break;

                case "View operating expenses":
                    operatingExp();
                    break;
            }
        });
}
// WORKS
function empAll() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })

};

// NEED TO HAVE A WAY TO SET OBJECT DATA INSIDE OF AN ARRAY AND USE IT IN THE CONNECTION QUERY
function empMng1() {
    connection.query("SELECT e.first_name, e.last_name, e.emp_id FROM employees e JOIN dept_managers dm ON e.emp_id = dm.emp_id;", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        // var obj = {};
                        for (var i = 0; i < results.length; i++) {
                            // obj = {first_name:results[i].first_name,
                            //        last_name:results[i].last_name,
                            //        emp_id:results[i].emp_id
                            // }
                            choiceArray.push({ first_name: results[i].first_name, emp_id: results[i].emp_id });
                        }
                        console.log(choiceArray);
                        return choiceArray;
                    },
                    message: "Which manager?"
                }
            ])

            .then(function (answer) {
                console.log(answer);
            })
    }

    )
};

function empMng2() {
    connection.query("SELECT e.first_name, e.last_name, e.emp_id FROM employees e JOIN dept_managers dm ON e.emp_id = dm.emp_id;", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        // var obj = {};
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name + " " + results[i].last_name + " " + results[i].emp_id);
                        }
                        console.log(choiceArray);
                        return choiceArray;
                    },
                    message: "Which manager?",
                    validate: function (email) {

                        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                        if (valid) {
                            return true;
                        } else {
                            console.log(".  Please enter a valid email")
                            return false;
                        }
                    },
                }
            ])

            .then(function (answer) {
                console.log(answer);
            })
    }

    )
};

// SAME ISSUE AS empMng
function empDep() {
    connection.query("SELECT e.first_name, e.last_name, e.emp_id FROM employees e JOIN dept_managers dm ON e.emp_id = dm.emp_id;", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        // var obj = {};
                        for (var i = 0; i < results.length; i++) {
                            // obj = {first_name:results[i].first_name,
                            //        last_name:results[i].last_name,
                            //        emp_id:results[i].emp_id
                            // }
                            choiceArray.push({ first_name: results[i].first_name, emp_id: results[i].emp_id });
                        }
                        console.log(choiceArray);
                        return choiceArray;
                    },
                    message: "Which manager?"
                }
            ])

            .then(function (answer) {
                console.log(answer);
            })
    }

    )
};

// NEED TO CREATE A WAY FOR THE FUNCTION TO RETURN AN ERROR IF THE EMPLOYEE IS NOT FOUND IN DATABSE 
function empSearch() {
    inquirer
        .prompt({
            name: "employee",
            type: "input",
            message: "What is the employee's first name?"
        })
        .then(function (answer) {
            connection.query("SELECT * FROM employees WHERE ?", { first_name: answer.employee }, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
};

// NEED TO HAVE A WAY TO SET OBJECT DATA INSIDE OF AN ARRAY
function addEmp() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "emp_id",
                    type: "input",
                    message: "What will the employee's id number be?"
                },
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employees's first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What will their role be?",
                    choices: [
                        11111
                    ]

                    // function () {
                    //     var choiceArray = [];
                    //     // var obj = {};
                    //     for (var i = 0; i < results.length; i++) {
                    //         // obj = {first_name:results[i].first_name,
                    //         //        last_name:results[i].last_name,
                    //         //        emp_id:results[i].emp_id
                    //         // }
                    //         choiceArray.push({ first_name: results[i].first_name, emp_id: results[i].emp_id });
                    //     }
                    //     console.log(choiceArray);
                    //     return choiceArray;
                    // },
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is their salary?",
                }
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        emp_id: answer.emp_id,
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        salary: answer.salary
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was added successfully!");
                        runSearch();
                    }
                );
            });
    })

};

// NEED TO CREATE A WAY FOR THE FUNCTION TO RETURN AN ERROR IF THE EMPLOYEE IS NOT FOUND IN DATABSE 
function removeEmp() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "emp_id",
                    type: "input",
                    message: "What is the employee ID of the employee you want to remove?",
                    // validate: function (emp_id) {

                    //     console.log(results);

                    //     for(var i = 0; i < results.length; i++) {
                    //         if (results[i].emp_id === emp_id) {
                    //             return true;
                    //         } else {
                    //             console.log(". Please enter a valid employee ID")
                    //             return false;
                    //         }

                    //     };
                    // },
                }
            ])
            .then(function (answer) {
                connection.query("DELETE FROM employees WHERE ?",
                    {
                        emp_id: answer.emp_id
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("Your employee was removed successfully!");
                        runSearch();
                    }
                );
            });
    });

};

// WORKS
function updateEmp() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "emp_id",
                    type: "input",
                    message: "What is the employee ID of the employee you want to update?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].emp_id)
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices:
                        [
                            "Update employee role",
                            "Update employee salary"
                        ]
                }
            ])
            .then(function (answer) {
                if (answer.choice === "Update employee role") {
                    inquirer
                        .prompt([
                            {
                                name: "role_id",
                                type: "input",
                                message: "What is the new role ID of the employee?"
                            }
                        ])
                        .then(function (answer2) {
                            connection.query("UPDATE employees SET ? WHERE ?",
                                [
                                    { role_id: answer2.role_id },
                                    { emp_id: answer.emp_id }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("Your employee's role was updated successfully!")
                                    runSearch();
                                }
                            )
                        })
                }
                else if (answer.choice === "Update employee salary") {
                    inquirer
                        .prompt([
                            {
                                name: "salary",
                                type: "input",
                                message: "What is the new salary of the employee?"
                            }
                        ])
                        .then(function (answer2) {
                            connection.query("UPDATE employees SET ? WHERE ?",
                                [
                                    { salary: answer2.salary },
                                    { emp_id: answer.emp_id }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("Your employee's salary was updated successfully!")
                                    runSearch();
                                }
                            )
                        });
                }
            });
    });
};

// WORKS
function viewDep() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};

// WORKS
function addDep() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "dept_id",
                    type: "input",
                    message: "What will the departments's id number be?"
                },
                {
                    name: "dept_name",
                    type: "input",
                    message: "What is the departments's name?"
                }
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        dept_id: answer.dept_id,
                        dept_name: answer.dept_name,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your department was added successfully!");
                        runSearch();
                    }
                );
            });
    });
};

// WORKS
function removeDep() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "dept_id",
                    type: "input",
                    message: "What is the department ID of the department you want to remove?",
                }
            ])
            .then(function (answer) {

                connection.query("DELETE FROM departments WHERE ?",
                    {
                        dept_id: answer.dept_id
                    },
                    function (err, res) {
                        if (err) throw eww;
                        console.log("Your department was removed successfully!");
                        runSearch();
                    }
                );
            });
    });
};

// WORKS
function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })

};

// WORKS
function addRole() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "role_id",
                    type: "input",
                    message: "What will the role's id number be?"
                },
                {
                    name: "title",
                    type: "input",
                    message: "What will the role's title be"
                },
                {
                    name: "dept_id",
                    type: "input",
                    message: "What will the role's department id be?"
                },
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        role_id: answer.role_id,
                        title: answer.title,
                        dept_id: answer.dept_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was added successfully!");
                        runSearch();
                    }
                );
            });
    })
};

// WORKS
function removeRole() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "role_id",
                    type: "input",
                    message: "What is the role ID of the role you want to remove?",
                }
            ])
            .then(function (answer) {

                connection.query("DELETE FROM roles WHERE ?",
                    {
                        role_id: answer.role_id
                    },
                    function (err, res) {
                        if (err) throw eww;
                        console.log("Your role was removed successfully!");
                        runSearch();
                    }
                );
            });
    });
};

// WORKS
function operatingExp() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "dept_id",
                    type: "rawlist",
                    message: "What department would you like to audit?",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].dept_id)
                        }
                        return choiceArray;
                    }
                },
            ])
            .then(function (answer) {
                connection.query(
                    "SELECT SUM(e.salary) AS Total_Expense,r.dept_id AS Department_ID FROM employees e JOIN roles r ON e.role_id = r.role_id WHERE ?",
                    [
                        {
                            dept_id: answer.dept_id
                        },
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        runSearch();
                    }

                );

            });
    });
};