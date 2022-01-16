const { sequelize, User } = require('../models');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Joi = require('joi');

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

const sema = Joi.object().keys({
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(4).required()
});

route.get('/users', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'admin') {
                User.findAll()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "This user is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'admin') {
                User.findOne({ where: { id : req.params.id } })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "This user is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.post('/users', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'admin') {
                const obj = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 10),
                    role: req.body.role
                };
            
                User.create(obj)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "This user is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'admin') {
                User.findOne({ where: { id : req.params.id } })
                    .then( user => {
                        user.firstName = req.body.firstName;
                        user.lastName = req.body.lastName;
                        user.username = req.body.username;
                        user.password = req.body.password;
                        user.role = req.body.role;

                        user.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "This user is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role === 'admin') {
                User.findOne({ where: { id : req.params.id } })
                    .then( user => {
                        user.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "This user is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});


module.exports = route;