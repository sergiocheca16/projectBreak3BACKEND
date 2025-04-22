const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectado con éxito ✅🚀');
    } catch (error) {
        console.log('Error al conectar a la base de datos ❌');
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnection;