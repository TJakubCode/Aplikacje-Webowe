const { Sequelize, DataTypes } = require('sequelize');

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

async function setupDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        
    } catch (error) {
        console.error('ERROR SETTING UP THE DATABASE:', error);
    }
}

setupDatabase();

