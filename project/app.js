const express = require('express');
const { sequelize } = require('./models');
const users = require('./routes/users.js');
const teams = require('./routes/teams.js');
const matches = require('./routes/players.js');
const comments = require('./routes/comments.js');
const path = require('path');

const app = express();

app.use('/api', users);
app.use('/api', teams);
app.use('/api', matches);
app.use('/api', comments);

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});