var express = require('express');
var router = express.Router();

// Perform CRUD for Show entity for movies
router.get('/', function(req, res, next) {
  res.render('shows', { title: 'List of Shows' });
});

module.exports = router;