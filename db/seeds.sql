INSERT INTO department (name)
VALUES ("engineering"),
    ("finance"),
    ("marketing"),
    ("sales")
;
SELECT * FROM DEPARTMENT;


INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 100000, 1),
    ("project manager", 130000, 1),
    ("engineering manager", 150000, 1),
    ("accountant", 80000, 2),
    ("accounting manager", 120000, 2),
    ("product marketing manager", 90000, 3),
    ("marketing lead", 80000, 3),
    ("sales rep", 85000, 4)
;
SELECT * FROM ROLE;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emma", "Elliot", 3, NULL),
    ("Jim", "Johnson", 5, Null),
    ("Tina", "Thomas", 6, Null),
    ("Cam", "Charles", 1, 1),
    ("Wanda", "Wise", 1, 1),
    ("Sarah", "Smith", 2, 1),
    ("Pam", "Phillips", 4, 2),
    ("Annett", "Alan", 7, 3),
    ("Hannah", "Hobbs", 8, Null)
;
SELECT * FROM employee;