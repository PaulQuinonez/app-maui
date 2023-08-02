// config/dbConfig.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const dbURL = process.env.MONGODB_URL;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  });

module.exports = mongoose.connection;
