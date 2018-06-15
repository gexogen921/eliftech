const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Company = mongoose.model('Company', new mongoose.Schema({
  name:  String,
  earnings: String,
  companies: [{}]
}));

router.get('/', function (req, res, next) {
  Company.find({}).exec(function (err, companies) {
    res.json({
      companies: companies || [],
    });
  });
});

router.post('/', function (req, res, next) {
  function tree(companies) {
    companies.forEach(function (company) {
      company._id = mongoose.Types.ObjectId();
      tree(company.companies);
    });
    return companies;
  }

  let companies = tree(req.body.companies);

  Company.remove({}, function () {
    companies.forEach(function (company, i) {
      Company.create(company, function () {
        if (i === companies.length - 1) {
          res.json({
            message: 'Successful',
            status: 200
          });
        }
      });
    });
  });
});

router.delete('/', function (req, res, next) {
  Company.deleteOne({ _id: req.body.id }, function () {
    res.json({
      message: 'Successful',
      status: 200
    });
  });
});

module.exports = router;
