const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query;
    const [count, result] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip(Number(offset))
            .limit(Number(limit)),
    ]);

    res.json({
        count,
        data: result
    });
}

const userPost = async (req = request, res = response) => {
    const { name, surnames, email, password, role } = req.body;
    const user = new User({ name, surnames, email, password, role });

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.json({
        msg: 'POST - USER',
        data: user
    })
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    //validar todo contra bd 
    if (password) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    //respuesta de la api
    res.json({ 
        msg: 'Edited User',
        data: user
     });
}

const userDelete = async(req, res = response) => {
    const {id} = req.params

    //Borrado logico
    const user = await Usuario.findByIdAndUpdate(id, {status: false});

    res.json({
        data: user,
    });
}

module.exports = {
    userPost,
    usersGet,
    userPut,
    userDelete
}