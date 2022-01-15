const express = require('express');
const { sequelize, Comment } = require('../models');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/comments', (req, res) => {
    Comment.findAll({ include: ['user', 'player'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/comments/:id', (req, res) => {
    Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/comments', (req, res) => {
    Comment.create({ userId: req.body.userId, playerId: req.body.playerId, rating: req.body.rating, comment: req.body.comment })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/comments/:id', (req, res) => {
    Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
        .then( comm => {
            comm.rating = req.body.rating;
            comm.comment = req.body.comment;

            comm.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});

route.delete('/comments/:id', (req, res) => {
    Comment.findOne({ where: { id : req.params.id }, include: ['user', 'player'] })
        .then( comm => {
            comm.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;