const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const express = require('express');
const rateLimit = require('express-rate-limit');
const database = require('./database');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const themeRoutes = require('./routes/themeRoutes');

// Start express app
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  database.connect();
  console.log(`App is listening at http://localhost:${port}`);
});

// GLOBAL MIDDLEWARES

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(bodyParser.urlencoded({ extended: true })); // Make sure the body is parsed beforehand.
app.use(hpp());

// ROUTES

app.use('/api/v1/themes', themeRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
