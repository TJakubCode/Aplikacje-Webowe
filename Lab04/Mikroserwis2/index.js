const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json())

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

const orders = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {type: DataTypes.INTEGER},
    bookId: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER}
});

app.get('/orders/:userId', async (req, res) => {
  const targetId = req.params.userId;
  const userOrders = await orders.findAll({
    where:{
      userId : targetId
    }
  });
  res.json(userOrders)
});

app.post('/orders', async (req, res) => {
  const {userId, bookId, quantity} = req.body;
  if (!userId || !bookId || !quantity){
    res.status(400).send("BAD INPUT")
    return
  }

  try {
    const response = await fetch(`http://localhost:3001/books/${bookId}`);
    if (!response.ok){
      res.status(404).send('BOOK DOES NOT EXIST');
      return
    }
  }
  catch{
    res.status(500).send('SERVER ERROR')
    return
  }
  const newOrder = await orders.create({userId, bookId, quantity})
  res.status(200).send(String(newOrder.id))
});

app.delete('/orders/:orderId', async (req, res) => {
  const id = req.params.orderId;
  const targetOrder = await orders.findByPk(id);
  if (!targetOrder){
    res.status(404).send(`NO SUCH ORDER WITH ID: ${id}`)
    return
  }

  await targetOrder.destroy()
  res.status(200).send('SUCCESSFULLY DELETED')
});

app.patch('/orders/:orderId', async (req, res) => {
  const id = req.params.orderId
  const {userId, bookId, quantity} = req.body;
  const order = await orders.findByPk(id)

  if (!order)
    res.status(404).send("OrderID NOT FOUND!")

  if (userId !== undefined) order.userId = userId
  if (bookId !== undefined) order.bookId = bookId
  if (quantity !== undefined) order.quantity = quantity
  await order.save()
  res.status(200).send('SUCCESSFULLY UPDATED')
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`SERVICE STARTED AT http://localhost:${PORT}`);
});

