const mysql = require("mysql2");
const db = require('../models/index');
const PlayersDG = db.sequelize.models.PlayersDG;
let express = require('express');
let router = express.Router();

router.get('/', async function (req, res) {
  let players = await PlayersDG.findAll();
  res.render('players/players',
    {
      title: 'Players page',
      players,
    });
});


// get create players
router.get('/register', (req, res) => {
  res.render('players/register', {
    title: 'Player Registration page',
    message: 'New Player',
    action: 'register'
  });
});

// post create player

router.post('/register', async (req, res) => {
  await PlayersDG.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  let players = await PlayersDG.findAll();
  console.log(players.length);

  if (players.length === 20) {
    res.redirect('/games')
  } else {
    res.redirect('/players');
  }
})

// delete player 
router.get('/delete', async (req, res) => {
  await PlayersDG.destroy({ where: { id: req.query.id } }).then((deleted) => {
    if (deleted === 1) {
      res.render('players/deleted',
        {
          title: 'Player deleted page',
          message: `You delete player with id: ${req.query.id}`
        });
    }
  });
  (error) => {
    res.render('players/deleted',
      {
        title: 'Players delete page',
        message: `<div><p>There was an error deleting player with id: ${req.query.id}</p>
                                   <p>Error: ${error}</p></div>`
      });
  }
});




module.exports = router;