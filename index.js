require('./config/config.js');

var express = require('express');
var shortid = require('shortid');
var _ = require('lodash');

const app = express();

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

  // get full URL before path
  var fullUrl = req.protocol + '://' + req.get('host');

  Link.findByURL(original_url).then((link) => {
    // does exist. Resend it.
    res.send(link.toJSON(fullUrl));
  }, (e) => {
    // doesn't exist. Let's make it.
    var shortlink = new Link({
      _id: shortid.generate(),
      original_url
    }).save().then((doc) => {
      // push it back to user.
      res.send(doc.toJSON(fullUrl));
    }, (e) => {
      // not a valid url.
      res.status(400).send({error: 'url not valid'});
    })
  });

});

app.get('/:shortid', (req,res) => {
  Link.findOne({
    _id: req.params.shortid,
  }).then((todo) => {
    if (!todo) {return res.status(404).send('Oops. No URL found here.');}
    res.redirect(todo.original_url);
  }, (e) => {
    res.status(400).send();
  });
});


app.listen(process.env.PORT, function () {
  console.log(`Express server is up on port ${process.env.PORT}`);
});


module.exports = {
  app
};
