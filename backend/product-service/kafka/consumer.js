const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'farmer-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'farmer-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = message.value.toString();
      console.log(`📩 Farmer Notification: New Order Received →`, msg);
    },
  });
};

module.exports = startConsumer;
