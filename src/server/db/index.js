require('dotenv').config();

const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const PotholeModel = require('./models/pothole');
const DonationModel = require('./models/donation');

// extract environment variables
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

// sequelize models
const User = UserModel(db, Sequelize);
const Pothole = PotholeModel(db, Sequelize);
const Donation = DonationModel(db, Sequelize);

// define relationship between tables
// this should create foreign key of userId for each pothole
Pothole.belongsTo(User);
// Donation.belongsTo(Pothole);

// create tables ({force: true} is for development only)
// -- it drops tables every time server is restarted
db.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

// export models
module.exports = {
  User,
  Pothole,
  Donation,
};
