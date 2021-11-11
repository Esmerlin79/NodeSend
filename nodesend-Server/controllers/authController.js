const { response } = require("express")
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jwt");


exports.userAuth = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                success: false,
                msg: 'El usuario no existe'
            })
        }

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                success: false,
                msg: 'Usuario o password no son correcto'
            })
        }

        const token = await generateJWT( usuario.id, usuario.nombre, usuario.email );
        
        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}


exports.getUserSession = async (req, res = response) => {

    const { id, name, email } = req;
    
    res.json({
        success: true,
        id,
        nombre: name,
        email
    })
}

