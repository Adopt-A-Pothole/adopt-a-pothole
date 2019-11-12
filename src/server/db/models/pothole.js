module.exports = (sequelize, type) => {
  return sequelize.define("pothole", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    zip: type.INTEGER, //! <--May need to change it based on api data
    median_income: type.INTEGER, //! <--May need to change it based on api data
    longitude: type.DECIMAL(10, 4),
    latitude: type.DECIMAL(10, 4),
    severity: type.INTEGER,
    title: type.STRING,
    description: type.STRING,
    fill_cost: type.INTEGER,
    money_donated: type.DECIMAL(10, 2),
    filled: type.BOOLEAN,
    image: type.STRING, // ! represent the orginal pic of the pothole
    progress_image: type.STRING, // ? <-- y'all like this field name
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    user_id: {
      type: type.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    }
  });
};
