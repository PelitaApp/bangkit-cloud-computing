var express = require('express');

var app = express();

app.use('/', (req, res) => {
  console.log('Response Success');
  res.send('Response Success');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is up and listening on ' + PORT);
});
