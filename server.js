const express = require('express');
const cors = require('cors');
const winston = require('winston');
const graphqlServer = require('express-graphql');

const schema = require('./src/service/schema');

const app = express();

const { combine, timestamp, label, printf } = winston.format;
const formatter = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  format: combine(
      label({ label: 'api.log'}),
      timestamp(),
      formatter
  ),
  transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'api.log' }),
  ]
});

app.use(cors());

app.use('/graphql', graphqlServer.graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3333, () => {
  try {
    logger.info('API started on port 3333 🚪');
  } catch(error) {
    logger.error(error);
  }
});