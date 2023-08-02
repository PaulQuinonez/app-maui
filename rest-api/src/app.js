const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConfig = require('./config/dbConfig');
const companiasRoutes = require('./routes/companyRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swagger');

dotenv.config(); // Cargar las variables de entorno desde el archivo .env
const app = express();

// Configuración del middleware
app.use(cors()); // Permitir solicitudes CORS desde cualquier origen
app.use(express.json()); // Parsear solicitudes con formato JSON

// Rutas de la API
app.use(companiasRoutes);

// Ruta para la interfaz Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  
  console.clear();
  console.log(`Servidor en funcionamiento en http://localhost:${port}/`);
});
