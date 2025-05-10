const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['internship', 'scholarship', 'job'] },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  requirements: [String],
});

module.exports = mongoose.model('Job', jobSchema);
