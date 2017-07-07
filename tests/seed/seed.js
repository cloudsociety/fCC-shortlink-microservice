var shortid = require('shortid');
var {Link} = require('./../../models/link.js');

const linkOneId = shortid.generate();
const linkTwoId = shortid.generate();

const links = [{
  _id: linkOneId,
  original_url: 'http://www.yahoo.com'
},{
  _id: linkTwoId,
  original_url: 'https://cloudsociety.com'
}];

const populateLinks = (done) => {
  Link.remove({}).then(() => {
    return Link.insertMany(links);
  }).then(() => done());
};

module.exports = {links, populateLinks};
