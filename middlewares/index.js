const validateFealds = require('./validate-fealds');
const validateJWT = require('./validate-jwt');
const existRole = require('./validate-role');

module.exports = {
    ...validateFealds,
    ...validateJWT,
    ...existRole
}