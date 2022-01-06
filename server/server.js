const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

const buyerRouter = require('./routes/buyer.router')

const agencyRouter = require('./routes/agency.router');

const featuresRouter = require('./routes/features.router');

const categoryRouter = require('./routes/category.router');

const quotesRouter = require('./routes/quotes.router');

const agencyConversionRouter = require('./routes/agencyConversion.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

app.use('/api/buyer', buyerRouter)

app.use('/api/agency', agencyRouter);

app.use('/api/features', featuresRouter);

app.use('/api/category', categoryRouter);

app.use('/api/quotes', quotesRouter);

app.use('/api/conversion', agencyConversionRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
