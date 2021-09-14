const { Router } = require('express');
const { check } = require('express-validator');

const { isRoleValid, emailExist, existUserById } = require('../helpers/db-validators');

const {
    validateFealds,
    validateJWT,
    existRole,
    adminRol
} = require('../middlewares');

const { 
    usersGet,
    userPost,
    userPut,
    userDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('', usersGet );

router.post('',[
    check('name', 'Name is required').not().isEmpty(),
    check('surnames', 'Surnames is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password min lenght is 6 characters').isLength({ min: 6 }),
    // check('rol', 'El rol no es valido, intenta con otro').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    check('email').custom(emailExist),
    validateFealds
], userPost );

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(), //middleware para validar si es un id de mongo o no
    check('id').custom( existUserById ), //valida que exista ese id si es valido de mongo
    check('role').custom(isRoleValid),
    validateFealds
], userPut );

router.put('/:id',[
    validateJWT,
    // adminRol, //Validacion solo es si tiene rol Admin
    existRole('ADMIN'), //Validacion para varios roles
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existUserById ),
    validateFealds
], userDelete );


module.exports = router;