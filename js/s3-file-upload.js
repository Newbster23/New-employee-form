const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3_instance } = require("./aws-config");

// upload files to s3
var uploadFile = multer({
  storage: multerS3({
    s3: s3_instance,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
      const folder = `${
        req.body.email +
        "_" +
        req.body.first_name +
        "_" +
        req.body.middle_name +
        "_" +
        req.body.last_name
      }/`;
      cb(null, folder + file.originalname);
    },
  }),
});

module.exports = {
  uploadFile,
};
