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

exports.getLink = async (req, res = response, next) => {
    
    const { url } = req.params;

   try {
        const enlace = await Enlace.findOne({ url });

        if( !enlace ) {
            return res.status(404).json({
                success: false,
                msg: 'Ese enlace no existe'
            })
        }
        
        const { id, descargas, nombre } = enlace;

        if( descargas === 1 ) {

            req.archivo = nombre;

            await Enlace.findByIdAndDelete(id);
            
            next();
        } else {

            enlace.descargas--;
            await enlace.save();
        } 

        res.json({
            success: true,
            archivo: enlace.nombre
        })

   } catch (error) {
       console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
   }

}