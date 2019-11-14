module.exports = (sequelize, type) => sequelize.define('pothole', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  zip: {
    type: type.INTEGER,
    allowNull: true
  },
  median_income: { //! <--May need to change it based on api data
    type: type.INTEGER,
    allowNull: true
  },
  longitude: type.DECIMAL(10, 4),
  latitude: type.DECIMAL(10, 4),
  severity: type.INTEGER,
  title: type.STRING,
  description: type.STRING,
  fill_cost: type.INTEGER,
  money_donated: type.DECIMAL(10, 2),
  filled: type.BOOLEAN,
  image: type.STRING, // ! represent the orginal pic of the pothole
  progress_image: {
    type: type.STRING,
    allowNull: true
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  user_id: {
    type: type.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});
