const { response } = require("express");
const shortid = require("shortid");
const Enlace = require("../models/Enlace");
const bcrypt = require('bcrypt');

exports.newLinks = async (req, res = response) => {
    
    const { nombre ,nombre_original, password, descargas } = req.body;

    try {
        const enlace = new Enlace();

        enlace.url = shortid.generate();
        enlace.nombre = nombre;
        enlace.nombre_original = nombre_original;

        if( req.email ) {

            if(descargas) {
                enlace.descargas = descargas;
            }
            
            if( password ) {
                const salt = bcrypt.genSaltSync(10);
                enlace.password = bcrypt.hashSync( password, salt);
            }

            enlace.autor = req.id;
        }

        await enlace.save();

        res.json({
            success: true,
            url: `${enlace.url}`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }

}

exports.getAllLink = async (req, res = response) => {
    try {
        const enlace = await Enlace.find({}).select('url -_id');

        res.json({
            success: true,
            enlaces: enlace
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

exports.getLink = async (req, res = response) => {
    
    const { url } = req.params;

   try {
        const enlace = await Enlace.findOne({ url });

        res.json({
            success: true,
            archivo: enlace.nombre,
            password: false
        })

   } catch (error) {
       console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
   }

}

exports.hasPassword = async (req, res = response, next) => {
    const { url } = req.params;

   try {
        const enlace = await Enlace.findOne({ url });

        if( !enlace ) {
            return res.status(404).json({
                success: false,
                msg: 'Ese enlace no existe'
            })
        }

        if(enlace.password) {
            return res.json({ password: true, enlace: url });
        }

        next();

   } catch (error) {
       console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
   }
}

exports.verifyPassword = async (req, res = response, next) => {
    
    const { url } = req.params;
    const { password } = req.body;

    try {
        const enlace = await Enlace.findOne({ url });

        const validPassword = bcrypt.compareSync( password, enlace.password );

        if( !validPassword ) {
            return res.status(400).json({
                success: false,
                msg: 'Password incorrecto'
            })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}