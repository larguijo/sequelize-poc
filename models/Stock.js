module.exports = (db, dt) => {
  const Stock = db.define('Stock', {
    quantity: {
      type: dt.DOUBLE(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        min: 0
      }
    }
  }, {
      underscored: true
    });

  return Stock;
}