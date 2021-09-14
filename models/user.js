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
        enum: ['ADMIN', 'USER']
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id; 
    return user;
}

module.exports = model('User', UserSchema);