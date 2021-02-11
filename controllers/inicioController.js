const express = require('express');

const {getMensajes, p} = require('./util/mensajesUtil');

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

module.exports = router;