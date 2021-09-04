const { respose, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userPost = async (req = request, res = response) => {
    const { name, surnames, email, password, role } = req.body;
    const user = new User({ name, surnames, email, password, role });

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.json({
        msg: 'POST - USER',
        user
    })
}

module.exports = {
    userPost,
}