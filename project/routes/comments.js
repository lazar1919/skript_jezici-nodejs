const express = require('express');
const { sequelize, Comment, User } = require('../models');
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

route.get('/comments', (req, res) => {
    Comment.findAll({ include: ['user', 'player'] })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    // User.findOne({ where: { id: req.user.userId } })
    //     .then( usr => {
    //         if (usr.role === 'moderator' || usr.role === 'admin') {
    //             Comment.findAll({ include: ['user', 'player'] })
    //                 .then( rows => res.json(rows) )
    //                 .catch( err => res.status(500).json(err) );
    //         } else {
    //             res.status(403).json({ msg: "Invalid credentials"});
    //         }
    //     })
    //     .catch( err => res.status(500).json(err) );
});

route.use(authToken);

route.get('/comments/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin' || usr.role === 'korisnik') {
                Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.post('/comments', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin' || usr.role === 'korisnik') {
                Comment.create({ userId: req.user.userId, playerId: req.body.playerId, rating: req.body.rating, comment: req.body.comment })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "You don't have permission for this action!"});
            }
        })
        .catch( err => res.status(500).json({ msg: "You don't have permission for this action!"}) );
});

route.put('/comments/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin' || usr.role === 'korisnik') {
                Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
                    .then( comm => {
                        comm.rating = req.body.rating;
                        comm.comment = req.body.comment;

                        comm.save()
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

route.delete('/comments/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'moderator' || usr.role === 'admin' || usr.role === 'korisnik') {
                Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
                    .then( comm => {
                        comm.destroy()
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