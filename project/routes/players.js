const express = require('express');
const { sequelize, Player } = require('../models');
const player = require('../models/player');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/players', (req, res) => {
    Player.findAll({ include: ['team'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/players/:id', (req, res) => {
    Player.findOne({ where: { id : req.params.id }, include: ['team'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/players', (req, res) => {
    Player.create({ teamId: req.body.teamId, firstName: req.body.firstName, lastName: req.body.lastName, number: req.body.number })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/players/:id', (req, res) => {
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
});

route.delete('/players/:id', (req, res) => {
    Player.findOne({ where: { id : req.params.id }, include: ['team'] })
        .then( player => {
            player.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;