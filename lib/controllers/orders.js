const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res) => {

    const postOrder = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.json(postOrder);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const productById = await Order.getById(id)
    res.json(productById);
  })

  .get('/', async (req, res) => {
     const allOrders = await Order.getAll();

    res.json(allOrders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Order.getById(id)
      const updateOrder = await Order.updateById(id, {
        product: req.body.product,
        quantity: req.body.quantity,
      })

      res.json(updateOrder);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deleteOrder = await Order.deleteById(id)

    res.json(deleteOrder);
  });
