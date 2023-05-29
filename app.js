const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const articleRouter = require('./routes/article');
require('@google-cloud/debug-agent').start();

const userRouter = require('./routes/user');
const pointRouter = require('./routes/point');
const wasteRouter = require('./routes/waste');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/articles', articleRouter);
app.use('/users', userRouter);
app.use('/points', pointRouter);
app.use('/wastes', wasteRouter);

app.get('/', (req, res) => {
  console.log('Response Success');
  res.send('Response Success');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is up and listening on ' + PORT);
});
