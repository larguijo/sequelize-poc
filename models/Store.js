module.exports = (db, DataTypes) => {
  const Store = db.define('Store', {
    name: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        len: [3, 50],
        isUppercase: true
      }
    },
    location: {
      type: DataTypes.STRING, allowNull: false
    }
  },
    {
      underscored: true
    });
  return Store;
}