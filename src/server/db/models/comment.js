module.exports = (sequelize, type) => sequelize.define('comment', {
  pothole_id: type.INTEGER,
  user_id: type.INTEGER,
  message: type.varchar(200) // ? <-- field name is message because having an field that the same as the model will lead to problems
});