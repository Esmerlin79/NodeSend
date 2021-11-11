const { response } = require("express");
const bcrypt = require('bcrypt');
const Usuario = require("../models/Usuario");

exports.nuevoUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let userExits = await Usuario.findOne({ email });

        if( userExits ) {
            return res.status(400).json({
                success: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        const usuario = new Usuario(req.body);

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash( password, salt );

        await usuario.save();

        res.status(201).json({
            success: true,
            msg: 'Usuario creado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}