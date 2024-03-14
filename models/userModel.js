const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'A user must have a username'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [8, 'A password must have at least 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'You must confirm your password!'],
        validate: {
            validator: function(val) {
                return val === this.password
            },
            message: 'Password and passwordConfirm are not the same!'
        }
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

module.exports = mongoose.model('User', userSchema);