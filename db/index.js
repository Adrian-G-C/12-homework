const connection = require('./connection');

// Function to view all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewAllRoles() {
  connection.query(
    `SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to view all employees
function viewAllEmployees() {
  connection.query(
    `SELECT 
      employee.id, employee.first_name, employee.last_name, 
      role.title AS job_title, department.name AS department, role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to add a department
function addDepartment(departmentName) {
  connection.query('INSERT INTO department SET ?', { name: departmentName }, (err, res) => {
    if (err) throw err;
    console.log(`\nDepartment '${departmentName}' added successfully!\n`);
    startApp();
  });
}

// Function to add a role
function addRole(roleTitle, roleSalary, departmentId) {
  connection.query(
    'INSERT INTO role SET ?',
    { title: roleTitle, salary: roleSalary, department_id: departmentId },
    (err, res) => {
      if (err) throw err;
      console.log(`\nRole '${roleTitle}' added successfully!\n`);
      startApp();
    }
  );
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  connection.query(
    'INSERT INTO employee SET ?',
    { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId || null },
    (err, res) => {
      if (err) throw err;
      console.log(`\nEmployee '${firstName} ${lastName}' added successfully!\n`);
      startApp();
    }
  );
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, roleId) {
  connection.query(
    'UPDATE employee SET ? WHERE ?',
    [{ role_id: roleId }, { id: employeeId }],
    (err, res) => {
      if (err) throw err;
      console.log(`\nEmployee with ID ${employeeId} updated successfully!\n`);
      startApp();
    }
  );
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};