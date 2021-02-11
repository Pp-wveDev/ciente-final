const express = require('express');

const getMensajes = require('./util/mensajesUtil');

var router = express.Router();

router.post('/logout', async (req, res) => {
    req.session.destroy();

    res.json({ hola: "hola" });
});

router.get('/', async (req, res) => {
    if (req.session.email) {
        // Obtenemos lista de mensajes
        const email = req.session.email;
        let mensajes = [];
        mensajes = await getMensajes(email);
        
        res.render('main', {
            email: email,
            mensajes: mensajes
        });
    } else {
        res.redirect('/');
    }
});

// Subir foto
var multer = require('multer');
var cloudinary = require('cloudinary').v2;
const { response } = require('express');

router.post('/uploadPhoto', async (req, res) => {
    try {
        console.log(req.files.image)
        let file = req.files.image;
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            console.log(err);
            console.log(result);
            res.render('success', {
                url: result.url 
            });
        })
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;