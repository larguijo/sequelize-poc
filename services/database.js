const Sequelize = require('sequelize');
const keys = require('../config/keys');

module.exports = () => {
  const { database, userName, password, host, dialect } = keys;
  const db = new Sequelize(database, userName, password, {
    host,
    dialect
  });

  db
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  return db;
}