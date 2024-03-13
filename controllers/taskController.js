const Task = require('../models/taskModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErorr');
const APIFeatures = require('../utils/apiFeatures');

exports.createTask = catchAsync(async (req, res, next) => {
    const {title, description} = req.body;

    const task = await Task.create({title, description, userId: req.user.id});
    res.status(201).json({
        status: 'success',
        data: task
    });
});

exports.getTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOne({_id: req.params.id, userId: req.user.id}).populate('userId');
    
    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: task
    });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
    const freatures = new APIFeatures(Task.find({userId: req.user.id}), req.query)
    .filter()
    .sort()
    .pagination();
    
    const tasks = await freatures.query;

    res.status(200).json({
        status: 'success',
        result: tasks.length,
        data: tasks
    });
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOneAndUpdate({_id: req.params.id, userId: req.user.id}, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: task
    });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.user.id});

    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});