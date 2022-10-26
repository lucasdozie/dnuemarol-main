"use strict";
const path = require("path");
const multer = require("multer"),
  multerS3 = require("multer-s3"),
  AWS = require("aws-sdk"),
  {
    DIGITAL_OCEAN_KEY_ID,
    DIGITAL_OCEAN_SECRET,
    DIGITAL_OCEAN_BUCKET
  } = require("./../../config/env"),
  { checkFileType } = require("./../../api/v1/helpers/checkFileType");
const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com"); // sfo2.digitaloceanspaces.com
//console.log({spacesEndpoint})
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  credentials: new AWS.Credentials({
    accessKeyId: DIGITAL_OCEAN_KEY_ID,
    secretAccessKey: DIGITAL_OCEAN_SECRET
  })
});
// change bucket property to space name

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "thrive-aos-assest/marol/cvs",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(request, file, cb) {
      //
      // console.log({ body: JSON.stringify(request.body) });
       console.log(file);
      cb(
        //  null, file.originalname
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("files");


export {upload };
