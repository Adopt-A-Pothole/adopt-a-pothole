const {
 User, Pothole, Donation, Comment
} = require('./index');

// save user to the database
const saveUser = req => User.create({
  id: req.id,
  full_name: req.full_name,
  email: req.email,
  amount: req.amount,
});

// save pothole to the database
const updateDonation = (req) => {
  Pothole.findAll({
    where: {
      id: req.pothole_id
    }
  })
    .then((pothole) => {
      console.log(pothole[0]);
      let money = Number(pothole[0].money_donated);
      Pothole.update({
        money_donated: money += req.amount,
      }, {
        where: { id: req.pothole_id }
      });
    })
    .catch((err) => {
      console.error(err, 'errr');
    });
};
const saveDonation = req => Donation.create({
  amount: req.amount,
  email: req.email,
  pothole_id: req.pothole_id
});

// gets the speific comments based on the potholeId
const getAllComments = potholeId => Comment.findAll({
  where: { pothole_id: potholeId },
});

// get all the donators of a pothole
const getDonators = potholdId => Donation.findAll({
  attributes: ['email'],
  where: { pothole_id: potholdId }
})
//  map over the array of eamil objects to return an array of emails
  .then(userEmails => userEmails.map(
    email => email.dataValues.email,
  ))
// should return an array of emails
  .then(userEmail => User.findAll({
    attributes: ['full_name'],
    where: {
      email: userEmail,
    }
  }));

module.exports.getDonators = getDonators;
module.exports.saveDonation = saveDonation;
module.exports.updateDonation = updateDonation;
module.exports.saveUser = saveUser;
module.exports.getAllComments = getAllComments;
