const express = require('express');

const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoute');
const appRoutes = require('./routes/appRoutes')

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use('/auth' , authRouter)
app.use('/api' , appRoutes)

module.exports = app;
