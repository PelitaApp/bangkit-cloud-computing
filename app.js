const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('@google-cloud/debug-agent').start();
const articleRouter = require('./routes/article');
const locationRouter = require('./routes/location');
const userRouter = require('./routes/user');
const pointRouter = require('./routes/point');
const trashRouter = require('./routes/trash');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/articles', articleRouter);
app.use('/locations', locationRouter);
app.use('/users', userRouter);
app.use('/points', pointRouter);
app.use('/trashes', trashRouter);

app.get('/', (req, res) => {
  console.log('Response Success');
  res.send('Response Success');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is up and listening on ' + PORT);
});
