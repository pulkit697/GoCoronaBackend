const Comment = require('../models/Comment');
const CTScanPost = require('../models/CTScanPost');
const { uploadFile } = require('../s3')

exports.getAllCtScans = (req, response, next) => {
    console.log('getting all the ct scans');
    CTScanPost.find()
        .then(ctscans => {
            response.status(200).json(ctscans)
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getmyctscans = (req, response, next) => {
    const id = parseInt(req.params.id);
    console.log("getting ct scans of ", id);
    CTScanPost.find({ userId: id })
        .then(ctscans => {
            response.status(200).json(ctscans)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postmyctscan = async (req, res, next) => {
    // console.log(req);
    if (!req.file) {
        res.status(201).json({
            message: 'no image provided'
        })
    }
    else {
        if (req.file.mimetype.split('/')[0] === 'image') {
            console.log('image uploading');
            const result = await uploadFile(req.file)
            const imageUrl = result.Location;
            const userId = req.body.userId;
            const timeStamp = req.body.timeStamp;
            const MlReport = req.body.MlReport;
            const comments = req.body.comments;
            const ctscanpost = new CTScanPost({ imageUrl: imageUrl, timeStamp: timeStamp, userId: userId, MlReport: MlReport, comments: comments });
            ctscanpost.save().then(result => {
                res.status(201).json({
                    message: 'ct scan successfully posted!',
                })
            })
                .catch(err => {
                    res.status(201).json({
                        message: 'Error!',
                        content: err
                    })
                })
        } else {
            console.log(req.file.mimetype);
            res.status(201).json({
                message: 'invalid content type!'
            })
        }
    }
}

exports.postmycomment = (req, res, next) => {
    const comment = req.body.comment;
    const doctorName = req.body.doctorName;
    const result = req.body.result;
    const commentObj = new Comment({ caption: comment, doctorName: doctorName, result: result });
    const id = req.body.postId;
    CTScanPost.findById(id, function (e, myPost) {
        if (e) {
            res.status(201).json({
                message: 'Error!',
                content: e
            })
        }
        else {
            console.log(myPost);
            console.log(myPost.comments);
            myPost.comments.push(commentObj);
            myPost.markModified('comments');
            myPost.save().then(result => {
                res.status(200).json({
                    message: 'successfully posted your comment!',
                    content: comment
                })
            })
                .catch(err => {
                    res.status(201).json({
                        message: 'Error!',
                        content: err
                    })
                })
        }
    });
}