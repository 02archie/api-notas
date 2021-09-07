const validateFealds = require('./validate-fealds');
const validateJWT = require('../middlewares/validate-jwt');
const validateRol = require('../middlewares/validate-rol');

module.exports = {
    ...validateFealds,
    ...validateJWT,
    ...validateRol
}