const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
  res.json({
    status: true,
    message: 'Api page',
  });
});

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
