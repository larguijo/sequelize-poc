async function findAll() {
  console.log('ok');
  const people = await models.Person.findAll();
  
  return people;
}

module.exports = {
  findAll
}
