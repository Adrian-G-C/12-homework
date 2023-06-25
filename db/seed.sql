use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Business Development Manager', 100000, 1),
    ('Sales Executive', 80000, 1),
    ('Lead Architect', 150000, 2),
    ('Software Developer', 120000, 2),
    ('Account Executive', 160000, 3),
    ('Financial Analyst', 125000, 3),
    ('Lead Water Boy', 250000, 4),
    ('Janitor', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Smith', 1, NULL),
    ('Michael', 'Lee', 2, 1),
    ('Emily', 'Garcia', 3, NULL),
    ('Keith', 'Johnson', 4, 3),
    ('Rajesh', 'Patel', 5, NULL),
    ('Melissa', 'Davis', 6, 5),
    ('Jessica', 'Moore', 7, NULL),
    ('Daniel', 'Thomas', 8, 7);