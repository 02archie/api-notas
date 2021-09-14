const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(400).json({
            msg: 'This token not exist, please login'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'This user not exist'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token not valid - User not exist'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        });
    }

}

module.exports = {
    validateJWT
}