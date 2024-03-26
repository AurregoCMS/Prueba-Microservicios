// index.js para el microservicio de Cuentas por Pagar
const express = require('express');
const app = express();
const port = 3002;

// Lista de cuentas por pagar
let cuentasPorPagar = [
    { clienteId: 1, concepto: "Pago 1", valor: 1000, fechaVencimiento: "2023-05-20" },
    { clienteId: 2, concepto: "Pago 2", valor: 2000, fechaVencimiento: "2023-06-15" },
    // Añadir más registros como sea necesario
];

// Endpoint para obtener las cuentas por pagar de un cliente específico
app.get('/bills/:clienteId', (req, res) => {
    const clienteId = parseInt(req.params.clienteId, 10);
    const cuentasCliente = cuentasPorPagar.filter(cuenta => cuenta.clienteId === clienteId);
    res.json(cuentasCliente);
});

const { Kafka } = require('kafkajs');

// Inicializar cliente de Kafka
const kafka = new Kafka({
  clientId: 'bills-service',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'bills-group', allowAutoTopicCreation: true });

// Función para procesar cada mensaje recibido
const run = async () => {
    // Conectar el consumidor
    await consumer.connect();
    // Suscribirse al topic de 'bills'
    await consumer.subscribe({ topic: 'bills', fromBeginning: true });

    // Escuchar mensajes
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
            const cuentaPorPagar = JSON.parse(message.value.toString());
            // Aquí podrías añadir la lógica para manejar la cuenta por pagar,
            // como añadirla a una base de datos o a una variable en memoria
            cuentasPorPagar.push(cuentaPorPagar);
        },
    });
};

run().catch(console.error);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Clients Microservice running on port ${port}`);
});