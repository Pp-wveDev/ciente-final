const axios = require('axios');

const mensajesUrl = 'https://josediaz-apirest.herokuapp.com/messages'

async function getMensajes(userId) {
    let mensajes;
    try {
        mensajes = (await axios.get(mensajesUrl + '/' + userId)).data;
        return mensajes;
    } catch (err) {
        return undefined;
    }
}

module.exports = getMensajes;