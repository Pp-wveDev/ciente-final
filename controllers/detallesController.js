const express = require('express');
const { p, getMensajeById } = require('./util/mensajesUtil');
var router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const mId = req.params.id;

        let mensaje = await getMensajeById(mId);
        let contenido = "", adjunto = "";
        if (mensaje.headers)
            contenido = mensaje.headers.contenido;
        if (mensaje.headers)
            adjunto = mensaje.headers.adjunto;

        res.render('detalles', {
            contenido: contenido,
            adjunto: adjunto,
            mId: mensaje.cabecera.idd
        });
    } catch (err) {
        res.json({ error: err });
    }
});

module.exports = router;