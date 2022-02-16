const {response, request} = require('express');

const usuariosGet = (req, res = response) => {    
    res.json({
        msg: 'get APi - controlador'
    });
}

const usuariosPut  = (req = request, res = response) => {

    const {q = 'sin query', nombre = 'sin nombre'} = req.query;

    res.json({
        msg: 'put APi - controlador',
        q,
        nombre
    });
}

const usuariosPost =  (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post APi - controlador',
        body
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete APi - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}