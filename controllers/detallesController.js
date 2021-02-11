const express = require('express');
const { p, getMensajeById } = require('./util/mensajesUtil');
var router = express.Router();

router.get('/:id', async (req, res) => {
    if(!req.session.email) {
        res.redirect('/');
    }
    try {
        const mId = req.params.id;

        let mensaje = await getMensajeById(mId);
        let contenido = "", adjunto = "";
        if (mensaje.cuerpo)
            contenido = mensaje.cuerpo.contenido;
        if (mensaje.cuerpo)
            adjunto = mensaje.cuerpo.adjunto;

        res.render('detalles', {
            contenido: contenido,
            adjunto: adjunto,
            mId: mensaje._id
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;