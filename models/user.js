const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    surnames: {
        type: String,
        required: [true, 'Surnames is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        emun: ['ADMIN', 'USER']
    },
    created_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    }
});

module.export = model('User', UserSchema);