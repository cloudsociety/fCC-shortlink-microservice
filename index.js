var express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/new/:url', (req,res) => {
  res.send('new works.');
});

app.get('/:shortid', (req,res) => {
  res.send('id works');
});


app.listen(PORT, function () {
  console.log(`Express server is up on port ${PORT}`);
});


module.exports = {
  app
};
