module.exports = (db, DataTypes) => {
  const Products = db.define('Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
          isUppercase: true
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 500],
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
          isIn: [['ACTIVE', 'DISCONTINUED']]
        }
      },
      price: {
        type: DataTypes.DOUBLE(10, 2),
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

  return Products;
}