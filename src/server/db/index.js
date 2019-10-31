require('dotenv').config();

const Sequelize = require('sequelize');

const {
  dialect,
  host,
  user,
  pwd,
  database,
  port
} = process.env;

const options = {
  host,
  dialect,
  port,
};

// create connection to DB
const db = new Sequelize(database, user, pwd, options);
