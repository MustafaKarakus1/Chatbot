const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  about: String,
  website: String,
});

module.exports = mongoose.model('Company', companySchema);
