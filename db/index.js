const connection = require('./connection');

function viewAllDepartments(callback) {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error retrieving departments:', err);
    } else {
      console.table(res);
    }
    callback();
  });
}

function viewAllRoles(callback) {
  const query = 'SELECT role.title, role.id, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id';
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error retrieving roles:', err);
    } else {
      console.table(res);
    }
    callback();
  });
}

function viewAllEmployees(callback) {
  const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error retrieving employees:', err);
    } else {
      console.table(res);
    }
    callback();
  });
}

function addDepartment(departmentName, callback) {
  const query = 'INSERT INTO department (name) VALUES (?)';
  connection.query(query, [departmentName], (err, res) => {
    if (err) {
      console.error('Error adding department:', err);
    } else {
      console.log('Department added successfully!');
    }
    callback();
  });
}

function addRole(roleTitle, roleSalary, departmentId, callback) {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  connection.query(query, [roleTitle, roleSalary, departmentId], (err, res) => {
    if (err) {
      console.error('Error adding role:', err);
    } else {
      console.log('Role added successfully!');
    }
    callback();
  });
}

function addEmployee(firstName, lastName, roleId, managerId, callback) {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  connection.query(query, [firstName, lastName, roleId, managerId], (err, res) => {
    if (err) {
      console.error('Error adding employee:', err);
    } else {
      console.log('Employee added successfully!');
    }
    callback();
  });
}

function updateEmployeeRole(employeeId, roleId, callback) {
  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  connection.query(query, [roleId, employeeId], (err, res) => {
    if (err) {
      console.error('Error updating employee role:', err);
    } else {
      console.log('Employee role updated successfully!');
    }
    callback();
  });
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
