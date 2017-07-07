var mongoose = require('mongoose');
var validator = require('validator');

var LinkSchema = mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      isAsync: true,
      validator: validator.isURL,
      message: '{value} is not a valid url'
    }

  },
  short_url: {
    type: String,
    // required: true,
    // trim: true,
  }
});

var Link = mongoose.model('Link', LinkSchema);

module.exports = {Link};
