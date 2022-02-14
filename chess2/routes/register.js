var express = require('express');
var router = express.Router();
const db = require('../models/index');
const player = db.sequelize.models.Player; 

router.get('/', function (req, res, next) {
    res.render('register/signup',
        {
            title: "Registration",
            message: 'Welcome to the registration office please fill out you information in order to join the tournament'
        });
});

router.post('/', async function (req, res, next) {
    await player.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }).then((create)=>{
        console.log(create);
        res.redirect('/waiting_lobby');
    }, (error) => {
        console.log(error.errors);
        res.render('register/error',
        {
            message: `${error.errors[0].message}`
        });
    }
    )
});






module.exports = router;
