
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido,
        validarEmail,
        existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRolValido ),
        validarCampos
] ,usuariosPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength({min:6}),       
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(validarEmail),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
] , usuariosPost );

router.delete('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);


module.exports = router;