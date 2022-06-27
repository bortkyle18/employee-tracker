# employee-tracker
A command-line application for managing a company's employees using node, inquirer, and MySQL.


### User story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```


## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Links](#links)
  * [Questions](#questions)


## Installation
- Navigate to a folder you were you would like the app to be saved using terminal.
- Clone the repo using
    ```
    git clone https://github.com/bortkyle18/employee-tracker.git
    ```
- Run ```npm install``` to install all needed packages.
- Change password in ```server.js``` to your mysql root user password.
- Use MySQL by typing ```mysql -u root -p``` into terminal and providing your password.
- Create schema of database tables by running ```source db/schema.sql```
- Set up test records yourself or run  ```source db/seeds.sql``` for preexisting test records.
- start the application by running.
    ```
    node server
    ```
    or
    ```
    npm start
    ```


## Usage
A command-line application that at a minimum allows the user to:
- Add departments, roles, employees
- View departments, roles, employees
- Update employee roles

### Walkthrough Video
https://drive.google.com/file/d/1Pmvk0bcEoo1tdHt9v8AG-qFPje3zv1a7/view


## Links
Github Repository: https://github.com/bortkyle18/employee-tracker


## Questions
[![GitHub](https://img.shields.io/badge/My%20GitHub-Click%20Here!-blueviolet?style=plastic&logo=GitHub)](https://github.com/bortkyle18) 
Feel free to reach me at bortkyle18@gmail.com with any question regarding this project!
