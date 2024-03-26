// index.js para el microservicio de Pedidos
const express = require("express");
const { Kafka, Partitioners } = require("kafkajs");
const app = express();
app.use(express.json());
const port = 3003;

// Inicializar cliente de Kafka
const kafka = new Kafka({
  clientId: "orders-service",
  brokers: ["kafka:9092"],
});
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

// Lista de pedidos
let pedidos = [];

// Endpoint para registrar un pedido
app.post("/orders", async (req, res) => {
  const { clienteId, valorTotal } = req.body;
  const pedidoId = pedidos.length + 1;
  const valorCuota = valorTotal / 3;

  // Registrar el pedido
  const nuevoPedido = {
    pedidoId,
    clienteId,
    valorTotal,
    fechaRegistro: new Date().toISOString(),
  };
  pedidos.push(nuevoPedido);

  // Enviar eventos de cuentas por pagar
  await producer.connect();
  for (let i = 1; i <= 3; i++) {
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 90 * i);
    const cuentaPorPagar = {
      clienteId,
      concepto: `Cuota ${i} del Pedido ${pedidoId}`,
      valor: valorCuota,
      fechaVencimiento: fechaVencimiento.toISOString().split("T")[0],
    };
    await producer.send({
      topic: "bills",
      messages: [{ value: JSON.stringify(cuentaPorPagar) }],
    });
  }

  res.status(201).json(nuevoPedido);
});

// Iniciar el servidor
app.listen(port, async () => {
  console.log(`Clients Microservice running on port ${port}`);
});
