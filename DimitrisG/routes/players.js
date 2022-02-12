const mysql = require("mysql2");
const db = require('../models/index');
const PlayersDG = db.sequelize.models.PlayersDG;
const GamesDG = db.sequelize.models.GamesDG;
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
    await generateGames(players);

    console.log('edw')

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

function compareNumbers(a, b) {
  return a - b;
}

generateGames = async (players) => {
  const playerIDs = [];

  // Create array that contains each player ID 3 times
  players.forEach(player => {
    for (let i = 0; i < 3; i++) {
      playerIDs.push(player.id);
    }
  });

  // Initialize array with created pairs
  const existing_pairs = [];

  // While not all players have played 3 times continue
  while (playerIDs.length) {
    // Randomly select first and second player
    const first_id = Math.floor(Math.random() * playerIDs.length);
    let second_id = Math.floor(Math.random() * playerIDs.length);

    // Make sure the players are not in reality the same player
    while (playerIDs[first_id] === playerIDs[second_id]) {
      second_id = Math.floor(Math.random() * playerIDs.length);
    }

    const player_1 = playerIDs[first_id];
    const player_2 = playerIDs[second_id];

    // Make sure player does not already exist, check the sorted array to avoid all duplicates
    if (!existing_pairs.includes([player_1, player_2].sort(compareNumbers))) {
      // Save the players pair in sorted format
      existing_pairs.push([player_1, player_2].sort(compareNumbers));

      // Remove the used players
      playerIDs.splice(playerIDs.indexOf(player_1), 1);
      playerIDs.splice(playerIDs.indexOf(player_2), 1);
    }
  }

  for (pair of existing_pairs) {
    await GamesDG.create({
      player_1: existing_pairs[0],
      player_2: existing_pairs[1],
    });
  }
}

module.exports = router;