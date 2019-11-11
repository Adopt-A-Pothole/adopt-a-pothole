module.exports = (sequelize, type) => sequelize.define('donation', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: type.DECIMAL(10, 2),
  email: type.STRING,
  pothole_id: type.INTEGER
});
