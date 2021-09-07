const { json } = require('express');
const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        json.toString(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('The token could not be generated');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}