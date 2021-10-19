require('dotenv').config();
const express = require('express');

const port = Number(process.env.PORT) || 80;
const app = express();

const formatDate = (field) => {
    const dateField = new Date(field);
    const day = `${dateField.getDate().toString().length < 2 ? `0${dateField.getDate()}` : `${dateField.getDate()}`}`;
    const month = `${(dateField.getMonth() + 1).toString().length < 2 ? `0${(dateField.getMonth() + 1)}` : `${(dateField.getMonth() + 1)}`}`;
    const year = dateField.getFullYear();
    
    return `${day}/${month}/${year}`;
};

app.listen(port, () => console.log(`App running at http://localhost on port ${port}`));

app.get('/api/personnel', (_, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = require('./data/personnel.json');

    const formattedData = data.map((objRow) => {
        return Object.keys(objRow).reduce((acc, curr) => {
            const toDate = new Date(objRow[curr]).getTime();
            if (Number.isNaN(toDate)) {
                acc[curr] = objRow[curr];
                return acc;
            }
            acc[curr] = formatDate(objRow[curr]);
            return acc;
        }, {})
    })
    
    res.json(formattedData);
})