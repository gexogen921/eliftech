const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let sheme = require('./shema');
let Company = mongoose.model('Company', sheme);

router.get('/', function (req, res, next) {
  Company.find().exec(function (err, companies) {
    res.json({
      companies: companies
    });
  });
});

router.post('/', function (req, res, next) {
  const companies = req.body.companies;
  companies.forEach((company) => {
    Company.update({ _id: company._id }, company, { upsert: false }, function (err, doc) {
      if(err) {
        return res.json({
          message: err,
          status: 500
        });
      }
    });
  });
});

router.delete('/', function (req, res, next) {
  Company.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      res.json({
        message: err,
        status: 500
      });
    }
  });
});

module.exports = router;
