# Express (4.17.3), Sequelize (6.16.1) and MySQL Portfolio for CRUD and Auth Application

## Requirement

1. Node.js
2. MySQL
3. Apache
4. Postman

## Set up

```
npm install
```

### Running for Development
```
npm run dev
```

App will be running on port 5000 (http://localhost:5000).

### What is this Repository for?

This project was my undergraduate thesis for chatbot backend that build with express.js and sequelize with mysql connection.

### Clone this Repository ?

Feel free to clone this repo.

## API Endpoint

Open `./routes/routes.js`

## API Endpoint for Development 

http://127.0.0.1:5000

### Reference Documentation

1.) MySQL Connection with Sequilize : https://sequelize.org/master/manual/getting-started.html 

2.) MySQL Connect to existing table in existing database : 
in ./models/user.model.js write `const User = sequelize.define('user', {`, where user is the table in MySQL database.

3.) Model synchronization using Sync()

- sync() Method − Only create model if exists. If the model exists, it will not overwrite the model.

- sync({force: true}) Method − Will create a new model if the model does not exist, however, if the model exists, it will overwrite the existing model.

https://sequelize.org/v6/manual/model-basics.html

4.) Synchronizing all models at once : https://sequelize.org/v6/manual/model-basics.html#providing-the-table-name-directly

### Solved Error Documentation

1.) SyntaxError: await is only valid in async functions and the top level bodies of modules

Solution : In server.js remove await and change to then and catch function 

2.) Error : TypeError: require(...).sync is not a function

Solution : In server.js change `require("./config/db.connect").sync();` to `require("./config/db.connect").sync;`

3.) Error : Access denied for user ''@'localhost' (using password: NO)

Solution : 

- Install dotenv, then and add `require('dotenv').config();` in server.js
https://stackoverflow.com/questions/46200729/er-access-denied-error-access-denied-for-user-localhost-using-password-n

Note : In node.js application, `require('dotenv').config();` line is needed in server.js file when developing locally in order to use environment variables.
https://stackoverflow.com/questions/60480863/requiredotenv-config-in-node-js

- MySQL server must running at the same time

4.)  Error : listen EADDRINUSE: address already in use :::3306

Solution : Check file .env and remove `PORT = 3306` of MySQL and replace with `DB_PORT = 3306`. Replace `process.env.PORT` in /config/config.js file to `process.env.DB_PORT`

5.) Error : [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.

Solution : For sequelize v6 change `operatorsAliases: false` in db.config.js to be `operatorsAliases: 0` (https://stackoverflow.com/questions/58593200/deprecationwarning-a-boolean-value-was-passed-to-options-operatorsaliases-this)

6.) TypeError: Cannot read properties of undefined (reading 'define')

Solution : https://stackoverflow.com/questions/58460033/sequelize-typeerror-cannot-read-property-define-of-undefined
