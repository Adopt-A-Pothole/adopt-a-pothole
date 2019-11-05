const { Router } = require('express');

const routes = Router();

// require models
const { User, Pothole } = require('./db/index');
const { saveUser, savePothole, saveDonation } = require('./db/helpers');


routes.post('/potholes', (req, res) => {
  console.log(req);
  savePothole(req.body);
  res.sendStatus(200);
  res.end();
});

// a get route to get a pothole
routes.get('/potholes', (req, res) => {
  console.log('WORKED');
  return Pothole.findAll({
    // where: { severity: 10 }
  })
    .then((pothole) => {
      console.log(pothole);
      res.send(pothole);
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

// get route to get a user
routes.get('/users', (req, res) => {
  // save user to db
  // hardcoded user for testing
  User.findAll({
    full_name: 'Avery',
  })
    .then((user) => {
      res.send(user);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});
// post route to create a user
routes.post('/users', (req, res) => {
  // save user to db
  console.log(req.body);
  return saveUser(req.body)
    .then((user) => {
      console.log(user);
      saveDonation(user);
    })
    .catch((err) => {
      console.log(err, 'errr');
    });
  // res.sendStatus(201);
  // res.end();
});


module.exports = { routes };
