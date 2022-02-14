var express = require('express');
var router = express.Router();
const db = require('../models/index');
const player = db.sequelize.models.Player;
const leaderboard = db.sequelize.models.Leaderboard;


router.get('/', async function (req, res, next) {
    let all_players = await player.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] });
    let arena = new Arena(all_players)
    await arena.start()
    let bulkArray = await arena.createBulkArray()
    await leaderboard.bulkCreate(bulkArray)
    let all_games = await leaderboard.findAll({ attributes: ['id', 'Player_Id_1', 'Player_Id_1', 'Result','Points'] });
    res.render('tournament',
        {
            title: 'Tournament',
            message: "Leaderboard",
            players: all_players,
            results: all_games
        });
});



function getRandomInt() {
    let x = Math.floor(Math.random() * (3 - 1 + 1) + 1); //The maximum is inclusive and the minimum is inclusive
    if (x == 1) {
        return [1, "Loss"]
    } else if (x == 2) {
        return [2, "Tie"]
    }
    else {
        return [3, "Win"]
    }
}

function getOpponent(array) {
    return (array[Math.floor(Math.random() * array.length)]);
}


class Arena {
    constructor(players) {
        this.players = players
        this.matches = []
    }
    async start() {
        this.players.forEach((player, index) => {
            while (player.array.length < 3) {
                let opponent = getOpponent(this.players)
                if (opponent != player) {
                    let test = player.array.map(name => name.Opponent.id)
                    if (!test.includes(opponent.id)) {
                        player.array.push({ Opponent: opponent, result: getRandomInt() })
                    }
                }
            }
            player.array.unshift({ 'owner': player.id })
            this.matches.push(player.array)
        })
    };

    async createBulkArray() {
        let bulk = []
        for (let match of this.matches) {
            for (let i = 0; i < 3; i++) {
                let v = { Player_Id_1: match[0].owner }
                v.Player_Id_2 = match[i + 1].Opponent.id
                v.Result = match[i + 1].result[1]
                v.Points = match[i + 1].result[0]
                bulk.push(v)
            }
        }
        // console.log(bulk);
        return bulk
    }
}


module.exports = router;