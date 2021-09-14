const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`This ${role} not exist`);
    }
}

const emailExist = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if(existEmail){
        throw new Error(`This email exist, try another`);
    }
}

const existUserById = async( id ) => {
    const existUserById = await User.findById(id);
    if(!existUserById){
        throw new Error('User not exist, try another id');
    }
}

module.exports = {
    isRoleValid,
    emailExist,
    existUserById,
}