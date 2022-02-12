const mysql = require("mysql2");
const db = require('../models/index');
const GamesDG = db.sequelize.models.GamesDG;
let express = require('express');
let router = express.Router();

router.get('/', async function (req, res) {
  let games = await GamesDG.findAll();
  res.render('games/games',
    {
      title: 'Game page',
      games,
    });
});


module.exports = router;