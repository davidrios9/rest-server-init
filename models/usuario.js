
const {Schema, model} = require('mongoose');

//creamos la estructura de la colección en la BD
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La password es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
    
});

//modificamos el método toJSON que retorna el objeto en la respuesta del servicios para que no
//envíe la contraseña y la versión
UsuarioSchema.methods.toJSON = function () {
    //sacamos los parametros ( __v, password ) del body y el resto queda en el objeto usuario
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);