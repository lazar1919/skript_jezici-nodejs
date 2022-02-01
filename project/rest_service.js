const express = require('express');
const { sequelize } = require('./models');
const users = require('./routes/users.js');
const teams = require('./routes/teams.js');
const matches = require('./routes/players.js');
const comments = require('./routes/comments.js');
const path = require('path');
const cors = require('cors');

const rest_service = express();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    credentials: true
}

rest_service.use(cors(corsOptions));

rest_service.use('/api', users);
rest_service.use('/api', teams);
rest_service.use('/api', matches);
rest_service.use('/api', comments);

// function getCookies(req) {
//     if (req.headers.cookie == null) return {};

//     const rawCookies = req.headers.cookie.split('; ');
//     const parsedCookies = {};

//     rawCookies.forEach( rawCookie => {
//         const parsedCookie = rawCookie.split('=');
//         parsedCookies[parsedCookie[0]] = parsedCookie[1];
//     });

//     return parsedCookies;
// };

// function authToken(req, res, next) {
//     const cookies = getCookies(req);
//     const token = cookies['token'];
  
//     if (token == null) return res.redirect(301, '/login');
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
//         if (err) return res.redirect(301, '/login');
    
//         req.user = user;
    
//         next();
//     });
// }

// // app.get('/register', (req, res) => {
// //     res.sendFile('register.html', { root: './static' });
// // });

// app.get('/login', (req, res) => {
//     res.sendFile('login.html', { root: './static' });
// });

// app.get('/', authToken, (req, res) => {
//     res.sendFile('index.html', { root: './static' });
// });

rest_service.use(express.static(path.join(__dirname, 'static')));

rest_service.listen({ port: 8080 }, async () => {
    await sequelize.authenticate();
});