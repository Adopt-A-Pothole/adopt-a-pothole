const { Router } = require('express');
const axios = require('axios');
const askGeo = require('./askGeo');

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
const { User, Pothole, Comment } = require('./db/index');
const {
  saveUser,
  updateDonation,
  saveDonation,
  getAllComments,
  getLowestMedianIncome,
  getDonators
} = require("./db/helpers");

routes.post('/potholes', (req, res) => {
  // grab incoming pothole info
  const {
    title,
    description,
    image,
    severity
  } = req.body.pothole;
  const {
    latitude,
    longitude
  } = req.body.pothole.location;
  // change to have longitude/latitude from address
  askGeo(latitude, longitude)
    .then(geoData => Pothole.create({
      longitude,
      latitude,
      severity,
      title,
      description,
      fill_cost: severity * 200,
      money_donated: 0,
      filled: false,
      image,
      zip: parseInt(geoData.UsZcta2010.GeoId, 10),
      median_income: geoData.UsTract2010.AcsHouseholdIncomeMedian
    }))
    .then(() => {
      // TODO fix this
      res.send();
    })
    .catch((err) => {
      console.error(err);
      res.send();
    });
});

// a get route to get a pothole
routes.get('/potholes', (req, res) => Pothole.findAll(
  { order: [['createdAt', 'DESC']] }
)
  .then((potholes) => {
    res.send(potholes);
    res.end();
  })
  .catch((err) => {
    console.error(err);
    res.send(500);
  }));

// get route to get a user
routes.get('/users', (req, res) => {
  // save user to db
  // hardcoded user for testing
  User.findAll({
    full_name: 'Avery', // !<-- WE NEED TO CHANGE THIS POSSIBLY
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
  const { donation, id } = req.body;
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
          sku: `${id}`,
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
      payment;

      const { email } = payment.payer.payer_info;
      const { total } = payment.transactions[0].amount;
      let { sku } = payment.transactions[0].item_list.items[0];
      sku = parseInt(sku);
      // save to db
      const toSave = { amount: +total, email, pothole_id: sku };
      saveDonation(toSave)
        .then(() => {
          updateDonation(toSave);
          // TODO send back success message
          res.redirect('/');
        })
        .catch((err) => {
          // TODO send back failure message
          console.error(err);
          res.redirect('/');
        });
    }
  });
});

// send toast that transaction was canceled
routes.get('/cancel', (req, res) => {
  res.redirect('/');
});


routes.get('/pothole', (req, res) => {
  let longitude;
  let latitude;
  return Pothole.findOne({ where: { longitude, latitude } })
    .then(pothole => res.send(pothole));
  // get pothole from db based on location
});

routes.get('/pothole/:id', (req, res) => {
  const { id } = req.params;
  Pothole.findOne({ where: { id, } })
    .then((pothole) => {
      res.json(pothole);
    });
});

routes.get('/pothole/donators/:pothole_id', (req, res) => {
  // deconstructing pothole_id to
  const { pothole_id } = req.params;
  // pass in the pothole_id the helper function
  getDonators(pothole_id)
    .then((donators) => {
      // send the list of donators for a specific pothole_id
      res.send(donators);
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

// handle reload errors
routes.get('/create', (req, res) => {
  res.redirect('/');
});

routes.get('/map', (req, res) => {
  res.redirect('/');
});

// get location
routes.get('/location', (req, res) => {
  // request location from google geolocation api
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.google_key}`)
    .then((response) => {
      const { lat, lng } = response.data.location;
      res.send({ lat, lng });
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

// post the comments in the db
routes.post('/comments', (req, res) => {
  // creates the instance & saves the fields inside the req.body
  Comment.create({
    pothole_id: req.body.pothole_id,
    user_id: req.body.user_id,
    user_name: req.body.user,
    message: req.body.message,
  })
    .then(() => {
      // send the status code to client
      res.status(201);
    })
    // if there is an error it'll be console log and a 500 status code will be sent
    .catch((err) => {
      res.status(500);
      console.log(`ERROR: ${err}`);
    });
});

//  get all the comments from the db and sends to frontEnd
routes.get('/comments/:pothole_id', (req, res) => {
  // deconstructing pothole_id to
  const { pothole_id } = req.params;
  // pass in the pothole_id the helper function
  getAllComments(pothole_id)
    .then((comments) => {
      // send the list of comments from a specific pothole_id
      res.send(comments);
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

// get all pothole Info for the helpANeighbor
routes.get('/helpANeighbor', (req, res) => {
  getLowestMedianIncome()
    .then((potholes) => {
      if (potholes.length > 4) {
        potholes = potholes.slice(0, 4);
      }
      res.send(potholes);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.log(err);
    });
});

module.exports = { routes };
