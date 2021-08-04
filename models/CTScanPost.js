const mongoose = require('mongoose');
const Comment = require('./Comment').schema;

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    MlReport: {
        type: Number,
        required: true
    },
    comments: {
        type: [Comment],
        required: true
    }
});

module.exports = mongoose.model('CTScanPost', postSchema);