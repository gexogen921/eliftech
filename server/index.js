const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eliftech');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../')));

app.use('/api', require('./api'));

app.use((req, res, next) => {
  next(new Error('Page not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: false,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('Listening on port: 3000');
});

module.exports = app;
