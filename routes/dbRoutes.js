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
    console.log('Products');
    try {
      const users = await models.Product.findAll(
        {
          include: [
            {
              model: models.Stock,
              include: [
                { model: models.Store }
              ]
            }
          ]
        }
      );
      res.json(
        users
      );
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const user = await models.Product.findByPk(req.params.id, {
        include: [models.Product.Stocks]
      });
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }

  })

  app.get('/api/products', async (req, res) => {
    try {
      const users = await models.Product.findAll({ order: [['name', 'ASC']] });
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const stores = await models.Store.findAll().map(store => ({ StoreId: store.id, quantity: 0 }));
      const newProduct = { ...req.body, Stocks: stores };
      const product = await models.Product.create(newProduct, {
        include: [models.Product.Stocks]
      });
      res.json(product);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.put('/api/products/:id/stocks', async (req, res) => {
    const { body: stocks } = req;
    const { id: productId } = req.params;
    let response = [];
    let transaction;

    try {
      transaction = await models.sequelize.transaction();
      await Promise.all(Object.keys(stocks).map(async key => {
        const stock = await models.Stock.findOne({
          where: {
            ProductId: productId,
            StoreId: key
          },
        }, { transaction });
        if (stock) {
          await stock.update({ quantity: stocks[key] }, { transaction });
        } else {
          await models.Stock.create({ ProductId: productId, StoreId: key, quantity: stocks[key] }, { transaction });
        }
      }));
      await transaction.commit();
      res.send();
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log('T error', error);
      res.status(500).send(error.errors[0].message);
    }
  });

  app.get('/api/stores', async (req, res) => {
    try {
      const users = await models.Store.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/api/stores/:id', async (req, res) => {
    try {
      const user = await models.Store.findByPk(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }

  })

  app.get('/api/stores', async (req, res) => {
    try {
      const users = await models.Store.findAll();
      res.json(
        users
      );
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/api/stores', async (req, res) => {
    try {
      const user = await models.Store.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
