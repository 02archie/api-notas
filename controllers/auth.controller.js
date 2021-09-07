const bcryptjs = require('bcryptjs');
const { response } = require('express');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // validation if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password not correct - email'
            });
        }

        // validate if user exist
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password not correct - status: false'
            })
        }

        // validate password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password not correct - password'
            })
        }

        // generate JWT
        const token = await generateJWT(user.id);

        //respuesta de la api
        res.json({
            user: user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'An error has ocurred'
        })
    }

}

module.exports = {
    login
}