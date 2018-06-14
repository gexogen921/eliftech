const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name:  String,
  earnings: String,
  companies: [{}]
});

module.exports = companySchema;