module.exports = (sequelize, type) => sequelize.define('comment', {
  pothole_id: type.INTEGER,
  user_id: type.INTEGER,
  user_name: type.STRING,
  message: type.STRING(200),
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});


// TODO: Create a function that saves the message with using comments.create() doing this saves it to db
