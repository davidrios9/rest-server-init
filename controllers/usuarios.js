const {response, request} = require('express');
const Usuario = require('../models/usuario');
const {validarEmail} = require('../helpers/db-validators');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req, res = response) => {    
    
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limite);
    // const total = await Usuario.countDocuments(query);

    const [usuarios, total] = await Promise.all([
         Usuario.find(query)
                .skip(desde)
                .limit(limite),
        Usuario.countDocuments(query)
    ]);       
    
    res.json({
        total,
        usuarios
    });
}

const usuariosPut  = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // se valida que venga un password en el request
    if(password){
        //Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate(id, resto);

    res.json({
        msg: 'put APi - controlador',
        usuario
    });
}

const usuariosPost =  async (req, res = response) => {
       
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Verificar si el correo existe
    validarEmail( correo );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate (id, {estado:false});

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}