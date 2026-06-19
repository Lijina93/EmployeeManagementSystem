# User Management API

  A REST API built with Express.js and MongoDB for managing Employees.

## Features

  * User creation
  * JWT Authentication
  * CRUD Operations for Employee
  * MongoDB Database Integration
  * Error Handling and Validation

## Tech Stack

  * Node.js         - v24.16.0
  * MongoDB Compass - 1.49.8


## Project Structure

  ```text
  project/
  │
  ├── config/
  │   └── db.js
  │
  ├── middleware/
  │   └── auth.js
  │
  ├── models/
  │   └── Company.js
  |   └── Country.js 
  |   └── Course.js
  |   └── Designation.js
  |   └── Employee.js
  |   └── Institution.js
  |   └── Specialization.js
  |   └── user.js
  │
  ├── routes/
  │   └── employee.js
  |   └── index.js
  |   └── others.js
  |   └── user.js
  │
  ├── .env
  ├── app.js
  ├── package.json
  └── README.md
  ```

## Installation

  Clone the repository:

  ```bash
  git clone https://github.com/midhunmadhavps/employee-management-api.git
  cd user-api
  ```

Install dependencies:

  ```bash
  npm install
  npx express-generator
  npm i --save mongoose
  npm install jsonwebtoken bcryptjs
  npm install dotenv
  npm install http-errors
  npm install cors
  node seed/seeds.js
  ```

## Environment Variables

  Create a `.env` file:

  ```env
  PORT=3000
  HOST=localhost

  DB_HOST=127.0.0.1
  DB_PORT=27017
  DB_NAME=CRM
  ```

## Run the Application

  Production mode:

  ```bash
  npm start
  ```

## Database Connection

  MongoDB connection is configured in:

  ```text
  config/db.js
  ```

## API Endpoints

  ### Login User

  POST `/api/login`

  Request:

  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```

  ### Get All Employees
  GET `/api/employee`

  ### Get All Employees
  GET `/api/employee:id`

  ### Get Employees by => pageSize/pageNum/sortField/sortOrder
  GET `/api/employee/10/1/FirstName/asc`
  
  ### Add  Employee
  POST `/api/employee`

  Request:

  ```json
  {
    "DOB": "1980-01-10",
    "BasicPay": 20000,
    "Gender": "Male",

    "FirstName": "Das",
    "LastName": "T",

    "MobileNumber": "9876543210",
    "PersonalEmail": "das.doe@hotmail.com",

    "PostalAddress": "edan street",
    "City": "newdelhi",

    "Country": "6a229b19925d6f96fce796d8",

    "Designation": "6a229358925d6f96fce796d0",

    "Education": [
      {
        "Course": "6a229cde925d6f96fce796e6",
        "Specialization": "6a229d17925d6f96fce796e9",
        "Institution": "6a229c8f925d6f96fce796db",
        "Grade": 8.89
      },
      {
        "Course": "6a229cde925d6f96fce796e7",
        "Specialization": "6a229d17925d6f96fce796e9",
        "Institution": "6a229c8f925d6f96fce796e1",
        "Grade": 9.86
      }
    ],

    "WorkExperience": [
      {
        "Company": "6a229d73925d6f96fce796f0",
        "LastDesignation": "Senior Software Engineer",
        "DurationMonths": 12,
        "Remarks": ""
      },
      {
        "Company": "6a229d73925d6f96fce796f1",
        "LastDesignation": "Senior Software Engineer",
        "DurationMonths": 24,
        "Remarks": ""
      }
    ]
  }
  ```

  ### Update a Employee entirely (Used to update an existing resource completely.)
  PUT `/api/employee:id`

  ### Update a Employee keys (Used to update specific fields of an existing resource.)
  PATCH `/api/employee:id`

  ### Delete a Employee
  DELETE `/api/employee:id`

  ### Get All company
  GET `/api/companies`

  ### Get All country
  GET `/api/countries`

  ### Get All courses
  GET `/api/courses`

  ### Get All designations
  GET `/api/designations`

  ### Get All EducationalInstitutions
  GET `/api/institutions`
  
  ### Get All Specializations
  GET `/api/specializations`


## Testing

Use Postman or Thunder Client to test the API endpoints.
 zip added in 
 postman/
 ├─ EmployeeAPI.postman_collection.json
 └─ EmployeeAPI.postman_environment.json

## validation added for employee add
 - same name can not be use
 - same email id cannot be use

## Future Improvements

* Role-Based Access Control
* Password Reset
* Email Verification
* Docker Support

## Author

Midhun Madhav P S
