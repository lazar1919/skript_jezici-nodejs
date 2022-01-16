const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const Joi = require('joi');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));

const sema = Joi.object().keys({
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(4).required()
});


app.post('/register', (req, res) => {

    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    };

    User.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            username: rows.username
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    username: usr.username
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});