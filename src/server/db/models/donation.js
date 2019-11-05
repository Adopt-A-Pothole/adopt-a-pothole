module.exports = (sequelize, type) => sequelize.define('donation', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: type.DECIMAL(10, 2),
  email: type.STRING, // May need to reference user email as foreign key
  user_id: {
    type: type.INTEGER,
    references: {
      model: 'users', // Note, its table's name, not object name
      key: 'id', // Note, its a column name
    }
  },
});
