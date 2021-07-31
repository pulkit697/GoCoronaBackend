const Comment = require('../models/Comment');
const CTScanPost = require('../models/CTScanPost');

exports.getAllCtScans = (req, resposne, next) => {
    console.log('getting all the ct scans');
    CTScanPost.find()
        .then(ctscans => {
            response.status(200).json(ctscans)
        })
        .catch(err => {
            console.log(err);
        })
}