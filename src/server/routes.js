const { Router } = require('express');

const routes = Router();

routes.post('/potholes', (req, res) => {
  console.log('boom');
});

routes.get('/potholes', (req, res) => {
  console.log('WORKED');
});

module.exports = { routes };
