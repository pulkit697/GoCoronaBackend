const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    result: {
        type: Numbers,
        required: true
    }
});

module.exports = mongoose.model('Comment', postSchema);