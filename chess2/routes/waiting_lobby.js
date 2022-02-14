var express = require('express');
var router = express.Router();
const db = require('../models/index');
const player = db.sequelize.models.Player; 

router.get('/', async function (req, res, next) {
    let all_players = await player.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] });
    console.log(all_players);
    res.render('register/waiting_lobby',
        {
            title: 'Waiting Lobby',
            message: "You can wait here until they are enough players to start the tournament",
            players: all_players
        });
});







module.exports = router;