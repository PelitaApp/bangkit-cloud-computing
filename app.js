const express = require('express');
const bodyParser = require('body-parser');

const articleRouter = require('./routes/article');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
  console.log('Response Success');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is up and listening on ' + PORT);
});
