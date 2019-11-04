// require models

const { User, Pothole } = require('./index');

// save user to the database
const saveUser = req => User.create({
  id: req.id,
  full_name: req.full_name,
  email: req.email,
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


module.exports.savePothole = savePothole;
module.exports.saveUser = saveUser;
