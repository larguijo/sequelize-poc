const models = require('../models');
module.exports = (app) => {
  app.get('/api/people', async (req, res) => {
    try {
      const users = await models.Person.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/people/:id', async (req, res) => {
    try {
      const user = await models.Person.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }

  })

  app.get('/api/people', async (req, res) => {
    try {
      const users = await models.Person.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/people', async (req, res) => {
    try {
      const user = await models.Person.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      const users = await models.Product.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const user = await models.Product.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }

  })

  app.get('/api/products', async (req, res) => {
    try {
      const users = await models.Product.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const user = await models.Product.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
