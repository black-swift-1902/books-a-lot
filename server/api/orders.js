const router = require('express').Router()
const { Order, Book, Order_log } = require('../db/models')
const { Op } = require('sequelize');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    if(!req.session.userId) res.sendStatus(404);
    const order = await Order.findByUserId(req.session.userId)
=======
    const order = await Order.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Book
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const order = await Order.findByUserId(req.params.userId)
>>>>>>> d8d808a0f52cb58db1e0fc96621ac122c728b670
=======
    if(!req.session.userId) res.sendStatus(404);
    const order = await Order.findByUserId(req.session.userId)
>>>>>>> 2762353b2f206818deb350d65155ca1dbea1a6c2
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: Number(req.params.orderId)
      },
      include: [
        {
          model: Book
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('body', req.body);
  try {
    if (!req.session.userId) {
      await Order.create({ submitted: true, total: rNumber(req.body.total) })
        .then(order => {
          req.session.cart.forEach(async book =>
            await order.addBook(book.id, { through: { quantity: book.order_log.quantity }}));
            return order;
        })
    }
    else {
      Order.update(
        { submitted: true, total: Number(req.body.total) },
        {
          where: {
            userId: req.session.userId,
            submitted: false
          }
        }
      )
    }
    req.session.cart = [];
    res.status(201).send();
  } catch (err) {
    next(err)
  }
})

