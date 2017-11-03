var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/results', function(req, res, next) {
  res.render('results', { title: 'Submitted', number: req.body.number });
});

router.get('/results', function(req, res, next) {
  res.render('results', { title: 'Results' });
});

module.exports = router;
