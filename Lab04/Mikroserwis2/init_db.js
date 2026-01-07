const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {type: DataTypes.INTEGER},
    bookId: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER}
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

