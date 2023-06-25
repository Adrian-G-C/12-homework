const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db');
const fs = require('fs');
const path = require('path');
const connection = require('./db/connection');

function startApp() {
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
        'Seed data',
        'Exit'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Add a department':
          promptAddDepartment();
          break;

        case 'Add a role':
          promptAddRole();
          break;

        case 'Add an employee':
          promptAddEmployee();
          break;

        case 'Update an employee role':
          promptUpdateEmployeeRole();
          break;

        case 'Seed data':
          seedData();
          break;

        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

function promptAddDepartment() {
  inquirer
    .prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then(answer => {
      addDepartment(answer.departmentName);
    });
}

function promptAddRole() {
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
      addRole(answers.roleTitle, answers.roleSalary, answers.departmentId);
    });
}

function promptAddEmployee() {
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
        message: 'Enter the manager ID for the employee (leave blank if none):'
      }
    ])
    .then(answers => {
      addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
    });
}

function promptUpdateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee to update:'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the new role ID for the employee:'
      }
    ])
    .then(answers => {
      updateEmployeeRole(answers.employeeId, answers.roleId);
    });
}

// function seedData() {
//   const seedFilePath = path.join(__dirname, 'db', 'seed.sql');
//   fs.readFile(seedFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading seed.sql file:', err);
//       startApp();
//     } else {
//       connection.query(data, (err, res) => {
//         if (err) {
//           console.error('Error seeding data:', err);
//         } else {
//           console.log('Data seeded successfully!');
//         }
//         startApp();
//       });
//     }
//   });
// }

startApp();