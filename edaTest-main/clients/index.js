// index.js para el microservicio de Clientes
const express = require("express");
const app = express();
const port = 3001;

// Lista de clientes
let clientes = [
  { id: 1, nombre: "Cliente 1" },
  { id: 2, nombre: "Cliente 2" },
  // Añadir más clientes como sea necesario
];

// Endpoint para obtener la lista de clientes
app.get("/clients", (req, res) => {
  res.json(clientes);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(
    `Clients Microservice running on port ${port}`
  );
});
