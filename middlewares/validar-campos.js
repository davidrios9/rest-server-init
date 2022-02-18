const { validationResult } = require('express-validator');

//Captura los erroes y los muestra antes de consumir el servicio
const validarCampos = (req, res, next ) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos
}