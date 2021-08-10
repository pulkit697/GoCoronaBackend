const mongoose = require('mongoose');
const Comment = require('./Comment').schema;

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    MlReport: {
        type: String,
        required: true
    },
    comments: {
        type: [Comment],
        required: true
    }
});

module.exports = mongoose.model('CTScanPost', postSchema);