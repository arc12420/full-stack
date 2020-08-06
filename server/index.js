require('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();
const ctrl = require('./ctrl');

const {SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set('db', dbInstance);
})
.catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', ctrl.create);
app.get('/api/products', ctrl.getAll);
app.get('/api/products/:id', ctrl.getOne);
app.put('/api/products/:id', ctrl.update);
app.delete('/api/products/:id', ctrl.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Richard is this your ${SERVER_PORT}?`)
});







