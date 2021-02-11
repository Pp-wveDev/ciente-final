const express = require('express');
const app = express();
const postMessage = require('./util/crearMensajesUtil');

var router = express.Router();

// Formulario para crear nuevo mensaje
router.get("/nuevoMensaje", async (req, res) => {
    if(!req.session.email) {
        res.redirect('/');
    }

    res.render('nuevoMensaje');
});

// Post del mensaje
var multer = require('multer');
var cloudinary = require('cloudinary').v2;

router.post("/crearMensaje", async (req, res) => {
    if(!req.session.email) {
        res.redirect('/');
    }
    
    // Subida a cloudinary
    let file = req.files.imagen;
    var url = null;

    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        url = result.url || null;
    });

    // Creacion del mensaje
    let mensaje = {}
    mensaje["cabecera"] = {}
    mensaje["cuerpo"] = {}

    mensaje["cabecera"]["de"] = req.session.email;
    mensaje["cabecera"]["para"] = req.body.para;
    mensaje["cabecera"]["asunto"] = req.body.asunto;
    mensaje["cuerpo"]["contenido"] = req.body.contenido;
    mensaje["cuerpo"]["url"] = url;
    
    await postMessage(mensaje);

    res.redirect('/principal');
});

module.exports = router;