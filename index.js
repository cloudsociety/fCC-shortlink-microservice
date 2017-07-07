var express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// database
var {mongoose} = require('./db/mongoose.js');

// models
var {Link} = require('./models/link.js');

app.use(express.static('public'));

app.get('/new/*', (req,res) => {
  // urls don't play nice with express because of slashes
  // either url encode before submit or data-munge the original url.
  // I used #2
  var original_url = req.originalUrl.slice(5); //get just the param
  console.log(original_url);
  // res.send('sure');
  var shortlink = new Link({
    original_url
  });
  shortlink.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send({error: 'url not valid'});
  })
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
