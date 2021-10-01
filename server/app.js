require('dotenv').config();
const express = require('express');

const port = Number(process.env.PORT) || 80;
const app = express();

app.listen(port, () => console.log(`App running at http://localhost on port ${port}`));

app.get('/api/personnel', (_, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = require('./data/personnel.json');
    res.json(data);
})