//1 Packages
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

//2 Get Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

//3 Controllers
const errorController = require('./controllers/errorController');

//4 Const Variables
const app = express();

//5 Midlewares

//Midlewares for testing
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next();
    });
}

//Midlewares to secure the express app

//Set Security HTTP Headers
app.use(helmet());

//Limit requests from same IP
const limiter = rateLimiter({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try after one houre'
});
app.use(limiter);

//Body parser
app.use(express.json({limit: '10KB'}));

//Data sanitizaion NoSQL against query injection
app.use(mongoSanitize());

//Data sanitization against xss
app.use(xss());

//6 Routers
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use(errorController);

module.exports = app;