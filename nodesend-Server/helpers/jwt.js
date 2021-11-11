const jwt = require('jsonwebtoken');

exports.generateJWT = async ( id, name, email ) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { id, name, email };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            
            if( error ) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}