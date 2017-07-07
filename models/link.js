var mongoose = require('mongoose');
var validator = require('validator');

var LinkSchema = mongoose.Schema({
  _id: {
    type:String,
  },
  original_url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      isAsync: false,
      validator: validator.isURL,
      message: '{value} is not a valid url'
    }
  }
});

LinkSchema.methods.toJSON = function (fullUrl) {
  var link = this;
  var linkObject = link.toObject();

  return {
      original_url: linkObject.original_url,
      short_url: fullUrl + '/' + linkObject._id
    }
};


LinkSchema.statics.findByURL = function (original_url) {
  var Link = this;

  return Link.findOne({original_url}).then((link) => {
    if (!link) {
      return Promise.reject();
    }
    return Promise.resolve(link);
  });
};


var Link = mongoose.model('Link', LinkSchema);

module.exports = {Link};
