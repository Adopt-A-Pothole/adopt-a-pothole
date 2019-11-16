require('dotenv').config();

const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const PotholeModel = require('./models/pothole');
const DonationModel = require('./models/donation');
const CommentModel = require('./models/comment');

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
const Comment = CommentModel(db, Sequelize);

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
    // user seed to test out
    User.create({
      full_name: 'Abel Terefe',
      email: 'abelterefe98@hotmail.com',
      amount: 320
    });
    User.create({
      full_name: 'Amber Jones',
      email: 'amberJones@gmail.com',
      amount: 300
    });
    User.create({
      full_name: 'Eliott Frilet',
      email: 'eliottFrilet@yahoo.com',
      amount: 320
    });
    // seed db with a few fake potholes
    Pothole.create({
      zip: 70119,
      median_income: 41304,
      longitude: -90.078858,
      latitude: 29.983008,
      severity: 2,
      title: 'BADDD',
      description: 'This is a big hole',
      fill_cost: 200,
      money_donated: 50,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572969785/diyl0gc4rycs9etkwzeb.jpg',
    });

    Pothole.create({
      zip: 70119,
      median_income: 33056,
      longitude: -90.099642,
      latitude: 29.970321,
      severity: 3,
      title: 'Bikes worst enemy',
      description: 'BIIGGG',
      fill_cost: 600,
      money_donated: 200,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1573148526/jhn3rpqdx3dgva0fbuum.jpg',
    });

    Pothole.create({
      zip: 70112,
      median_income: 30270,
      longitude: -90.080922,
      latitude: 29.959415,
      severity: 1,
      title: 'Not much happening',
      description: 'small',
      fill_cost: 100,
      money_donated: 60,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572992370/pko97kuqohnya41ybhgg.jpg',
    });
    Comment.create({
      pothole_id: 1,
      user_id: 1,
      message: "Wow this the biggest hole I've seen"
    });
    Comment.create({
      pothole_id: 2,
      user_id: 2,
      message: 'HOLY MOLY NOW THATS WHAT I CALL A HOLE',
    });
    Comment.create({
      pothole_id: 2,
      user_id: 2,
      message: 'YO, who made this HOLE???',
    });
    Comment.create({
      pothole_id: 3,
      user_id: 3,
      message: 'WHO MADE THIS POTHOLE SHIA LABEOUF',
    });

    Donation.create({
      amount: 10.00,
      email: 'amberJones@gmail.com',
      pothole_id: 2,
    });

    Donation.create({
      amount: 120.00,
      email: 'amberJones@gmail.com',
      pothole_id: 2,
    });

    Donation.create({
      amount: 1.00,
      email: 'amberJones@gmail.com',
      pothole_id: 2,
    });
  });

// export models
module.exports = {
  User,
  Pothole,
  Donation,
  Comment,
};
