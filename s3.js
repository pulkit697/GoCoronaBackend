require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs');


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const accessKeySecret = process.env.AWS_ACCESS_SECRET_KEY

// console.log(accessKeySecret);

const s3 = new S3({
    accessKeyId: accessKey,
    secretAccessKey: accessKeySecret
});


// upload
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    // console.log(file)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    // console.log(uploadParams);
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

// download
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams)
}
exports.getFileStream = getFileStream