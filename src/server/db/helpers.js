const { User, Pothole, Donation } = require('./index');

// save user to the database
const saveUser = req => User.create({
  id: req.id,
  full_name: req.full_name,
  email: req.email,
  amount: req.amount,
  createdAt: req.createAt,
  updatedAt: req.updatedAt
});


// save pothole to the database
const savePothole = req => Pothole.create({
  longitude: req.longitude,
  latitude: req.latitude,
  severity: req.severity,
  description: req.description,
  fill_cost: req.fill_cost,
  money_donated: req.money_donated,
  filled: req.filled,
  image: req.image,
  createdAt: req.createdAt
});

const saveDonation = req => Donation.create({
  amount: req.amount,
  email: req.email,
  pothole_id: req.id
});

module.exports.saveDonation = saveDonation;
module.exports.savePothole = savePothole;
module.exports.saveUser = saveUser;
