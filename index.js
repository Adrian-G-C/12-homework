const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db');

function runApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments(runApp);
          break;

        case 'View all roles':
          viewAllRoles(runApp);
          break;

        case 'View all employees':
          viewAllEmployees(runApp);
          break;

        case 'Add a department':
          promptAddDepartment(runApp);
          break;

        case 'Add a role':
          promptAddRole(runApp);
          break;

        case 'Add an employee':
          promptAddEmployee(runApp);
          break;

        case 'Update an employee role':
          promptUpdateEmployeeRole(runApp);
          break;

        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

function promptAddDepartment(callback) {
  inquirer
    .prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then(answers => {
      addDepartment(answers.departmentName, callback);
    });
}

function promptAddRole(callback) {
  inquirer
    .prompt([
      {
        name: 'roleTitle',
        type: 'input',
        message: 'Enter the title of the role:'
      },
      {
        name: 'roleSalary',
        type: 'input',
        message: 'Enter the salary for the role:'
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'Enter the department ID for the role:'
      }
    ])
    .then(answers => {
      addRole(answers.roleTitle, answers.roleSalary, answers.departmentId, callback);
    });
}

function promptAddEmployee(callback) {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the first name of the employee:'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the last name of the employee:'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the role ID for the employee:'
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter the manager ID for the employee (optional):'
      }
    ])
    .then(answers => {
      addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId, callback);
    });
}

function promptUpdateEmployeeRole(callback) {
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee you want to update:'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the new role ID for the employee:'
      }
    ])
    .then(answers => {
      updateEmployeeRole(answers.employeeId, answers.roleId, callback);
    });
}

runApp();