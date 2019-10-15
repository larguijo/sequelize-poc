const Sequelize = require('sequelize');
const keys = require('../config/keys');
const { database, userName, password, host, dialect } = keys;
const sequel = new Sequelize(database, userName, password, {
  host,
  dialect
});
const db = {};

sequel
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

['Person', 'Product', 'Store', 'Stock'].forEach(entity => {
  const model = sequel.import(entity, require(`./${entity}`));
  db[model.name] = model;
})
db.Product.Stocks = db.Product.hasMany(db.Stock);
db.Stock.Store = db.Stock.belongsTo(db.Store);

sequel.sync();

console.log('DB', db);
db.sequelize = sequel;
db.Sequelize = Sequelize;

module.exports = db;
