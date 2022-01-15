const express = require('express');
const { sequelize, Team } = require('../models');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/teams', (req, res) => {
    Team.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/teams/:id', (req, res) => {
    Team.findOne({ where: { id : req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/teams', (req, res) => {
    Team.create({ name: req.body.name, country: req.body.country, trainerName: req.body.trainerName })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/teams/:id', (req, res) => {
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
});

route.delete('/teams/:id', (req, res) => {
    Team.findOne({ where: { id : req.params.id } })
        .then( team => {
            team.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;