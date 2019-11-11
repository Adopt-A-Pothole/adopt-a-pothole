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
  })
  .then(() => {
    // seed db with a few fake potholes
    Pothole.create({
      longitude: 12.080,
      latitude: 12.080,
      severity: 2,
      title: 'BADDD',
      description: 'This is a big hole',
      fill_cost: 200,
      money_donated: 50,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572969785/diyl0gc4rycs9etkwzeb.jpg'
    });

    Pothole.create({
      longitude: 29.9990,
      latitude: 32.0000,
      severity: 3,
      title: 'Bikes worst enemy',
      description: 'BIIGGG',
      fill_cost: 600,
      money_donated: 200,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1573148526/jhn3rpqdx3dgva0fbuum.jpg'
    });

    Pothole.create({
      longitude: 43.4444,
      latitude: 21.0000,
      severity: 1,
      title: 'Not much happening',
      description: 'small',
      fill_cost: 100,
      money_donated: 60,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572992370/pko97kuqohnya41ybhgg.jpg'
    });
  });

// export models
module.exports = {
  User,
  Pothole,
  Donation,
};
