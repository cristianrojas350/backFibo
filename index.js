const express = require('express');
const cors = require('cors');
const fibonacciRoutes = require('./routes/fibonacci');  // Si tienes esta ruta
const sendEmailRoutes = require('./routes/send-email');  // Nueva ruta para enviar correos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Si necesitas habilitar CORS
app.use(express.json());  // Para procesar las solicitudes con JSON

// Rutas
app.use('/api/fibonacci', fibonacciRoutes);  // Ruta de Fibonacci
app.use('/api/fibonacci', sendEmailRoutes);  // Ruta para enviar correos

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
