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
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
}

rest_service.use(cors(corsOptions));

rest_service.use('/api', users);
rest_service.use('/api', teams);
rest_service.use('/api', matches);
rest_service.use('/api', comments);

rest_service.use(express.static(path.join(__dirname, 'static')));

rest_service.listen({ port: 8088 }, async () => {
    await sequelize.authenticate();
});