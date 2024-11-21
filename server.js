const express = require('express');
const fibonacciRoutes = require('./routes/fibonacci');

const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());

// Rutas
app.use('/api/fibonacci', fibonacciRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
