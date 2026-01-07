import bcrypt from "bcryptjs";

const API_KEY = "123"
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json())

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`SERVICE STARTED AT http://localhost:${PORT}`);
});

app.post('/api/register ', async (req, res) => {
  const {email, password} = req.body
  if (await users.findOne({where:{email: email}})){
    res.status("400").send("THIS EMAIL IS TAKEN")
    return
  }
    


  try{
    await users.create({email: email, password: password})
  }
  catch{
    res.status(500).send("BŁĄD SERWERA")
    return
  }

  const token = jwt.sign(
    { email: email}, 
    API_KEY, 
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });

})