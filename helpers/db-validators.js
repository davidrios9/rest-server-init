const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const validarEmail = async (correo = '') => {

    //Verificar si el correo existe
    const existeMail = await Usuario.findOne({ correo });
    if (existeMail) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}


const existeUsuarioPorId = async (id ) => {

    //Verificar que el id exista
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error(`El id: ${id} ,no existe en la BD`);
    }
}

module.exports = {
    esRolValido,
    validarEmail,
    existeUsuarioPorId
}