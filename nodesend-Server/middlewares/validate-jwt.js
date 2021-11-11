const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.validateJWT = (req, res = response, next) => {

    const token = req.header('x-auth-token');

   if( token ) {
        try {

            const { id, name, email } = jwt.verify( token, process.env.SECRET_JWT_SEED );

            req.id = id;
            req.name = name;
            req.email = email;

        } catch (error) {
            console.log(error);
            console.log('Token no valido')
        }
   }

    next();

}