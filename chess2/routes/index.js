var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { title: 'Chess Tournament',
    message:"You can click below to register for the tournament!" });
});







module.exports = router;
