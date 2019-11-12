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
    // seed db with a few fake potholes
    Pothole.create({
      longitude: -90.078858,
      latitude: 29.983008,
      severity: 2,
      title: 'BADDD',
      description: 'This is a big hole',
      fill_cost: 200,
      money_donated: 50,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572969785/diyl0gc4rycs9etkwzeb.jpg'
    });

    Pothole.create({
      longitude: -90.099642,
      latitude: 29.970321,
      severity: 3,
      title: 'Bikes worst enemy',
      description: 'BIIGGG',
      fill_cost: 600,
      money_donated: 200,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1573148526/jhn3rpqdx3dgva0fbuum.jpg'
    });

    Pothole.create({
      longitude: -90.080922,
      latitude: 29.959415,
      severity: 1,
      title: 'Not much happening',
      description: 'small',
      fill_cost: 100,
      money_donated: 60,
      filled: false,
      image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572992370/pko97kuqohnya41ybhgg.jpg'
    });
    Comment.create({
      pothole_id: 23,
      user_id: 6,
      message: "Wow this the biggest hole I've seen",
    });
    Comment.create({
      pothole_id: 24,
      user_id: 7,
      message: 'HOLY MOLY NOW THATS WHAT I CALL A HOLE',
    });
    Comment.create({
      pothole_id: 24,
      user_id: 8,
      message: 'WHO MADE THIS POTHOLE SHIA LABEOUF',
    });
  });

// export models
module.exports = {
  User,
  Pothole,
  Donation,
  Comment,
};
