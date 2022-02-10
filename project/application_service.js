const express = require('express');
const path = require('path');
const users = require('./routes/users.js');
const teams = require('./routes/teams.js');
const matches = require('./routes/players.js');
const comments = require('./routes/comments.js');
const history = require('connect-history-api-fallback');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/admin/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/admin/login');
    
        req.user = user;
    
        next();
    });
}


const application_service = express();

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
application_service.use(cors(corsOptions))

application_service.use(express.json());
application_service.use(express.urlencoded({extended: true}));

// application_service.use('/admin', users);
// application_service.use('/admin', teams);
// application_service.use('/admin', matches);
// application_service.use('/admin', comments);

// application_service.get('/register', (req, res) => {
//     res.sendFile('register.html', { root: './static' });
// });

application_service.get('/admin/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

application_service.get('/admin', authToken, (req, res) => {
    res.sendFile('firstPage.html', { root: './static' });
});

application_service.use(express.static(path.join(__dirname, 'static')));

const staticMdl = express.static(path.join(__dirname, 'dist'));

application_service.use(staticMdl);

application_service.use(history({ index: '/index.html' }));

application_service.use(staticMdl);

application_service.listen(8082);