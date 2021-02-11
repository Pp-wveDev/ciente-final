const axios = require('axios');

const mensajesUrl = 'https://josediaz-apirest-def.herokuapp.com/messages'

async function getMensajes(userId) {
    let mensajes;
    try {
        mensajes = (await axios.get(mensajesUrl + '/' + userId)).data;
        return mensajes;
    } catch (err) {
        return undefined;
    }
}

// No tenemos metodo para esto en la api
async function getMensajeById(mId) {
    let mensajes;
    try {
        mensajes = (await axios.get(mensajesUrl)).data;
        for (let i = 0; i < mensajes.length; i++) {
            if (mensajes[i]._id == mId)
                return mensajes[i];
        }

    } catch (err) {
        console.log(err);
    }

    return undefined;
}

module.exports = {
    getMensajes,
    getMensajeById
};