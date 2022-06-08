const connectToMongo = require('./database');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());

// total available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Keep Note Backend listening on http://localhost:${port}`)
})
