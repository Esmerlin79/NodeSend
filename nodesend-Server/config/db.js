const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        
        await mongoose.connect( process.env.DB_CON );
        console.log('Connection successful');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    dbConnection
}