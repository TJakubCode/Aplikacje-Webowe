const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

sequelize.define('books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER }
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

