const axios = require('axios');

const mensajesUrl = 'https://josediaz-apirest-def.herokuapp.com/messages'

async function postMessage(mensaje) {
    try {
        let result = (await axios.post(mensajesUrl, {
            "de": mensaje.cabecera.de,
            "para": mensaje.cabecera.para,
            "asunto": mensaje.cabecera.asunto,
            "contenido": mensaje.cuerpo.contenido,
            "adjunto": mensaje.cuerpo.url
        })).data;
        return result;
    } catch (err) {
        return "err";
    }
}

async function deleteMessage(mId) {
    try {
        let result = (await axios.delete(mensajesUrl + "/id/" + mId)).data;
        return result;
    } catch (err) {
        return "err";
    }
}

module.exports = {
    postMessage,
    deleteMessage
};