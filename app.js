const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const sanitizeNosqlQuery = require('express-mongo-sanitize');
const preventCrossSiteScripting = require('xss-clean');
const preventParameterPollution = require('hpp');
const requestIp = require('request-ip');
const morgan = require('morgan');

const en = require('./locale/en');
const notFoundException = require('./errors/not-found-exception');
const errorHandler = require('./errors/error-handler');
const { rizz, user } = require('./routes');

const app = express();

console.log('I will be there');

app.enable('trust proxy');
app.use('*', cors(options));

app.use((req, res, next) => {
  const client_ip = requestIp.getClientIp(req);
  req.headers['x-real-ip'] = client_ip;
  next();
});

app.use(morgan('common'));

app.use(helmet());
app.use(
  '/',
  rateLimiter({
    max: 1000,
    windowMs: 1000 * 60 * 15,
    message: en['24-hrs-ip-rate-limit'],
    legacyHeaders: false,
  })
);

app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());

app.use(sanitizeNosqlQuery());
app.use(preventCrossSiteScripting());
app.use(preventParameterPollution());

app.use(compression());

app.use(function (req, res, next) {
  res.on('finish', function () {
    logRequest(req, res);
  });
  next();
});

const baseRoute = '/api/v1';
app.use(baseRoute + '/rizz', rizz);
app.use(baseRoute + '/user', user);

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
});

app.use((req, res, next) => {
  next(new notFoundException(en['page-not-found']));
});

app.use(errorHandler);

module.exports = { app };
