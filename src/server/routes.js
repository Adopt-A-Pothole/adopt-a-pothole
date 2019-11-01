const { Router } = require('express');

const routes = Router();

// require models
const { User, Pothole } = require('./db/index');

routes.post('/potholes', (req, res) => {
  console.log('boom');
});

routes.get('/potholes', (req, res) => {
  console.log('WORKED');
});

// post route to create a user
routes.post('/users', (req, res) => {
  // save user to db
  // hardcoded user for testing
  User.create({
    full_name: 'Avery',
    email: 'avery.berkowitz@gmail.com',
  })
    .then(() => {
      res.send(201);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

module.exports = { routes };
