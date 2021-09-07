const { Router } = require('express');
const { check } = require('express-validator');

const { userPost } = require('../controllers/users.controller');

const path = 'user';

router.post(`${user}`,[
    check('name', 'Name is required').not().isEmpty(),
    check('surnames', 'Surnames is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password min lenght is 6 characters').isLength({ min: 6 }),
    // check('rol', 'El rol no es valido, intenta con otro').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExist),
    validarCampos
], usuariosPost );

module.exports = router;