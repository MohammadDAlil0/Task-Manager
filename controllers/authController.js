const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErorr');

const User = require('../models/userModel');


const createSendToken = (user, statusCode, res) => {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN});

    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    });
};

exports.register = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    user.password = user.__v = undefined;
    createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).select('+password');
    if (!user || !await bcrypt.compare(password.toString(), user.password)) {
        return next(new AppError('Incorrect username or password', 400));
    } 
    user.password = user.__v = undefined;
    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const curUser = await User.findById(decoded.id);
    if (!curUser) {
        return next(new AppError('The user belonging to this token does no longer exist!', 401));
    }
    req.user = curUser;

    next();
});