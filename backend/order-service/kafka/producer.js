// kafka/producer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log("✅ Kafka Producer connected");
}

async function sendOrderNotification(order) {
  console.log("📤 Sending Kafka message:", order);

  await producer.send({
    topic: 'order-events',
    messages: [
      { value: JSON.stringify(order) }
    ],
  });

  console.log("✅ Kafka message sent.");
}

module.exports = {
  connectProducer,
  sendOrderNotification,
};
