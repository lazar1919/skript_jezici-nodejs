const { sequelize, User } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/users', (req, res) => {
    User.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/users/:id', (req, res) => {
    User.findOne({ where: { id : req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/users', (req, res) => {
    User.create({ firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, password: req.body.password })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/users/:id', (req, res) => {
    User.findOne({ where: { id : req.params.id } })
        .then( user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.username = req.body.username;
            user.password = req.body.password;

            user.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});

route.delete('/users/:id', (req, res) => {
    User.findOne({ where: { id : req.params.id } })
        .then( user => {
            user.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        } )
        .catch( err => res.status(500).json(err) );
});


module.exports = route;