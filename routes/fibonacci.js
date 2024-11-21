const express = require('express');
const router = express.Router();

// Función para calcular la secuencia Fibonacci y devolverla en orden descendente
const fibonacciDescendente = (x, y, count) => {
  let series = [x, y]; // Comenzamos con las semillas (x, y)

  // Generamos los siguientes números en la secuencia Fibonacci
  for (let i = 2; i < count + 2; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }

  // Cortamos la secuencia para que solo contemos los números después de las semillas
  let result = series.slice(2);  // Eliminamos las semillas (x y)

  // Ordenamos la secuencia Fibonacci de mayor a menor
  result.sort((a, b) => b - a); // Ordenamos de forma descendente

  // Devolvemos la secuencia ordenada descendente seguida de las semillas
  return [...result, x, y];  // Las semillas van al final, y los Fibonacci en orden descendente
};

// Ruta para obtener la serie de Fibonacci descendente
router.post('/', (req, res) => {
  const { hour, minute, second } = req.body;

  // Validación de los parámetros
  if (typeof hour !== 'number' || typeof minute !== 'number' || typeof second !== 'number') {
    return res.status(400).json({ error: 'Los parámetros deben ser números' });
  }

  // Extraemos las semillas de los minutos (minuto tiene 2 dígitos)
  const minuteStr = minute.toString().padStart(2, '0');
  const x = parseInt(minuteStr.charAt(0));  // Primer dígito del minuto (semilla 1)
  const y = parseInt(minuteStr.charAt(1));  // Segundo dígito del minuto (semilla 2)
  
  // La cantidad de números a generar es igual al valor de los segundos
  const count = second;  // Cantidad de números a mostrar (segundos)

  // Generamos la secuencia Fibonacci descendente
  const series = fibonacciDescendente(x, y, count);
  
  // Devolvemos la serie generada como respuesta
  res.json({ series });
});

module.exports = router;
