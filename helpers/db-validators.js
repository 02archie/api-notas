const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`This ${rol} not exist`);
    }
}

const emailExist = async(correo = '') => {
    const existEmail = await User.findOne({ correo });
    if(existEmail){
        throw new Error(`This email exist, try another`);
    }
}

const existUserById = async( id ) => {
    const existeUsuarioId = await User.findById(id);
    if(!existeUsuarioId){
        throw new Error('User not exist, try another id');
    }
}

module.exports = {
    esRoleValido,
    emailExist,
    existUserById,
}