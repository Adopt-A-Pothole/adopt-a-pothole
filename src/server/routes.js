const { Router } = require('express');
require('dotenv').config();

const routes = Router();

// paypal config
const paypal = require('paypal-rest-sdk');

const {
  paypal_client_id,
  paypal_client_secret,
} = process.env;

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: paypal_client_id,
  client_secret: paypal_client_secret
});

// require models
const { User, Pothole } = require('./db/index');
const { saveUser, savePothole, saveDonation } = require('./db/helpers');


routes.post('/potholes', (req, res) => {
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
      res.sendStatus(201);
      res.end();
    })
    .catch((err) => {
      console.log(err, 'errr');
    });
});


// post route to make a paypal payment
routes.post('/donate', (req, res) => {
  // get payment amount
  const { donation } = req.body;
  // make sure donation is valid
  if (isNaN(+donation) || +donation < 0) {
    console.log('not a valid amount');
    res.send('invalid');
    return;
  }
  // create payment object
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel'
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'big hole',
          sku: '1',
          currency: 'USD',
          price: donation,
          quantity: 1
        }]
      },
      amount: {
        currency: 'USD',
        total: donation
      },
      description: 'This is the payment description.'
    }]
  };
  // send payment object to paypal
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      // find approval url
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          // send back url
          res.send(payment.links[i].href);
          // res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

// handle successful payment
routes.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const { paymentId } = req.query;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      // TODO need to save transaction to db;
      payment;

      const { email } = payment.payer.payer_info;
      const { total } = payment.transactions[0].amount;
      let { sku } = payment.transactions[0].item_list.items[0];
      sku = parseInt(sku);
      // save to db
      const toSave = { amount: +total, email, pothole_id: sku };
      saveDonation(toSave)
        .then(() => {
          // TODO send back success message
          res.redirect('/');
        })
        .catch((err) => {
          // TODO send back failure message
          console.error(err);
          res.redirect('/');
        });
      // amount -- email -- pothole_id
      // TODO prompt a toast saying successful payment
      
    }
  });
});

// send toast that transaction was canceled
routes.get('/cancel', (req, res) => {
  // TODO - handle toast message
  res.redirect('/');
});

/*
routes.get('/pothole', (req, res) => {
  // req body to include location
  if (!req.body.location) {
    // get single pothole
    return Pothole.findAll()
      .then(potholes => res.send(potholes[0]))
      .catch(err => console.error(err));
  }
  // get pothole from db based on location
});
*/

routes.get('/create', (req, res) => {
  res.redirect('/');
});

module.exports = { routes };
