const express = require('express');
const { sequelize, Team, User } = require('../models');
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

route.use(authToken);

route.get('/teams', (req, res) => {
    Team.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    // User.findOne({ where: { id: req.user.userId } })
    //     .then( usr => {
    //         if (usr.role === 'moderator' || usr.role === 'admin') {
    //             Team.findAll()
    //                 .then( rows => res.json(rows) )
    //                 .catch( err => res.status(500).json(err) );
    //         } else {
    //             res.status(403).json({ msg: "Invalid credentials"});
    //         }
    //     })
    //     .catch( err => res.status(500).json(err) );
});

route.get('/teams/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Team.findOne({ where: { id : req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.post('/teams', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Team.create({ name: req.body.name, country: req.body.country, trainerName: req.body.trainerName })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.put('/teams/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Team.findOne({ where: { id : req.params.id } })
                    .then( team => {
                        team.name = req.body.name;
                        team.country = req.body.country;
                        team.trainerName = req.body.trainerName;

                        team.save()
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

route.delete('/teams/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin') {
                Team.findOne({ where: { id : req.params.id } })
                    .then( team => {
                        team.destroy()
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