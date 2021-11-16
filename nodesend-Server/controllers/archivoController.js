const { response } = require("express");
const multer = require("multer");
const { configuration } = require("../helpers/config-multer");
const fs = require('fs');
const Enlace = require("../models/Enlace");

exports.subirArchivo = async (req, res = response) => {

    const upload = multer(configuration(req)).single('archivo');

    try {
        upload( req, res, async(error) => {
            console.log(req.file);
            if( !error ) {
                res.json({
                    success: true,
                    archivo: req.file.filename
                })
            }else {
                console.log(error)
                res.status(400).json({
                    success: false,
                    msg: 'Hubo un error al subir el archivo'
                })
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

exports.eliminarArchivo = async (req, res = response) => {
    
    try {
        
        fs.unlinkSync(__dirname + '/../uploads/' + req.archivo);
        console.log('Archivo Eliminado');
    } catch (error) {
        console.log(error);
    }
}

exports.download = async (req, res = response, next) => {

    const { archivo } = req.params;
    
    const enlace = await Enlace.findOne({ nombre: archivo });

    const { id, descargas, nombre } = enlace;
    
    const dirnameArchivo = __dirname + '/../uploads/' + archivo;

    res.download(dirnameArchivo);

    if( descargas === 1 ) {

        req.archivo = nombre;

        await Enlace.findByIdAndDelete(id);
        
        next();
    } else {

        enlace.descargas--;
        await enlace.save();
    } 
}