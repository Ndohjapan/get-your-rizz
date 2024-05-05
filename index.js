/* eslint-disable no-undef */
const { app } = require('./app');
const { connectToDatabase } = require('./connection/db-conn');
const dotenv = require('dotenv');
dotenv.config();


connectToDatabase();

const port = process.env.PORT || 9004;

app.listen(port, async () => {
  console.log('Server is running on port ' + port);
});

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  app.close(() => {
    console.log('Process terminated!');
  });
});
