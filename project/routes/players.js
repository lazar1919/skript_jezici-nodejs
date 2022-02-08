const express = require('express');
const { sequelize, Player, User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.get('/players', (req, res) => {
    Player.findAll({ include: ['team'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    // User.findOne({ where: { id: req.user.userId } })
    //     .then( usr => {
    //         if (usr.role === 'moderator' || usr.role === 'admin' || usr.role === 'korisnik') {
    //             Player.findAll({ include: ['team'] })
    //                 .then( rows => res.json(rows) )
    //                 .catch( err => res.status(500).json(err) );
    //         } else {
    //             res.status(403).json({ msg: "Invalid credentials"});
    //         }
    //     })
    //     .catch( err => res.status(500).json(err) );
});

route.get('/players/:id', authToken, (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Player.findOne({ where: { id : req.params.id }, include: ['team'] })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.post('/players', authToken, (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Player.create({ teamId: req.body.teamId, firstName: req.body.firstName, lastName: req.body.lastName, number: req.body.number })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.put('/players/:id', authToken, (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Player.findOne({ where: { id : req.params.id }, include: ['team'] })
                    .then( player => {
                        player.firstName = req.body.firstName;
                        player.lastName = req.body.lastName;
                        player.number = req.body.number;

                        player.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.delete('/players/:id', authToken, (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Player.findOne({ where: { id : req.params.id }, include: ['team'] })
                    .then( player => {
                        player.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});


module.exports = route;