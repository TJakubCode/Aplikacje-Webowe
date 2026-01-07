const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json())

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

const books = sequelize.define('books', {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  year: DataTypes.INTEGER
});

app.get('/books', async (req, res) => {
  const allBooks = await books.findAll();
  res.json(allBooks);
});

app.get('/books/:bookId', async (req, res) => {
  const id = req.params.bookId;
  const userBook = await books.findByPk(id);

  if (userBook)
    res.json(userBook)
  else
    res.status(404).send(`NO SUCH BOOK WITH ID: ${id} IN DATABASE`);
});

app.post('/books', async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).send('TITLE AND AUTHOR REQUIRED');
  }
  const newBook = await books.create({ title, author, year });
  res.status(201).json(newBook);
});

app.delete('/books/:bookId', async (req, res) => {
  const id = req.params.bookId;
  const userBook = await books.findByPk(id);
  

  if (userBook){
    await userBook.destroy();
    res.status(200).send('SUCCESSFULLY DELETED')
  }
  else
    res.status(404).send(`NO SUCH BOOK WITH ID: ${id} IN DATABASE` );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`SERVICE STARTED AT http://localhost:${PORT}`);
});