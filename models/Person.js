module.exports = (db, DataTypes) => {
  const Person = db.define('Person', {
    firstName: { type: DataTypes.STRING, allowNull: false, field: 'first_name' },
    lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
    gender: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false, field: 'date_of_birth' },
    countryOfBirth: { type: DataTypes.STRING, allowNull: false, field: 'country_of_birth' },
    createdAt: { type: DataTypes.DATEONLY, field: 'created_at' },
    updatedAt: { type: DataTypes.DATEONLY, field: 'updated_at' },
  }, { tableName: 'person' });
  return Person;
}
