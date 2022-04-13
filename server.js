const express = require("express");
const app = express();

// set dotenv to able use env variable
require('dotenv').config();

// cors
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// mysql connection synchronously and performs the necessary changes in the table to make it match the model
require("./models").sequelize.sync({ alter: true}).then(() => {
  console.log("All models were synchronized successfully.");
  console.log("Connected to database")
})
// // drop the table if it already exists
// require("./models").sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// route
require("./routes")(app);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
