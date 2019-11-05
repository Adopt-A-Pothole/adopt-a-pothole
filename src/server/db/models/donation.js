module.exports = (sequelize, type) => sequelize.define('donation', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: type.DECIMAL(10, 2),
  email: type.STRING, // May need to reference user email as foreign key
  pothole_id: {
    type: type.INTEGER,
  },
});
