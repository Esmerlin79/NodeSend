const express = require('express');
const { dbConnection } = require('./config/db');
const cors = require('cors');
require('dotenv').config({ path:'.env'});

const app = express();

dbConnection();

// app.use( express.static('public') );

app.use( express.json() );

const corsOptions = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(corsOptions) );

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));


const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando el puerto ${port}`);
})

