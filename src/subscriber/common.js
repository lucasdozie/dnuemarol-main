"use strict";
// const {
//   SENDGRID_ADMIN_EMAIL,
//   DIGITAL_OCEAN_BUCKET
// } = require("../config/env");
// const MailerServices = require("./../services/api/Mail");
// const DownloadService = require("../utils/downloadData");
// const FileUploadService = require("../utils/fileDigitalocean");
// const AdminService = require("../services/api/adminService");
// const { ADVANCED_DOWNLOAD, ADVANCED_DOWNLOAD2 } = require("./types");

module.exports = function CommonEvent(
  pubSub,
  dbConnectionService,
  services,
  constants,
  env,
  logger
) {
  //pubSub.on(constants.ADVANCED_DOWNLOAD, DownloadService.handleAdvanceDownload);
  //pubSub.on(constants.ADVANCED_DOWNLOAD_ALT, services.thirdParty.download.handleAdvance);
  pubSub.on(constants.ADVANCED_DOWNLOAD, async params => {
    console.log("Initalizing... event: ");
    let {
      Parser,
      data,
      adminId: _id,
      filename,
      data_model,
      dateRange,
      fields = null,
      userInfo
      //requestHeaders
    } = params;
    try {
      console.log("calling event: ");
      //get admin info
      //const paramsOption = Object.assign({}, { _id });
      //const userInfo = await AdminService.getOne(paramsOption);
      //const userInfo = await services.aos.admin.getOne(paramsOption, requestHeaders);

      //console.log({userInfo})
      //Convert to CSV
      const toCSV = await services.thirdParty.download.quickdownloadparse(
        Parser,
        fields,
        data
      );

      console.log({ toCSV });
      //const toCSV = await DownloadService.quickdownloadparse(Parser, fields, data);
      //@todo send mail with csv url
      const mailObj = {
        link: `${env.DIGITAL_OCEAN_BUCKET}/advanceDownload/${filename}`,
        // filename,
        email: userInfo?.email,
        first_name: userInfo?.first_name,
        mailcopys: ["codedmonks@gmail.com"],
        templateName: "download",
        data_model,
        dateRange
      };
      //Upload a copy to digitalocean
      //await FileUploadService({ Body: toCSV, Key: filename })
      await services.thirdParty.upload
        .fileUpload({ Body: toCSV, Key: filename })
        .then(async res => {
          //await MailerServices.sendMail(mailObj);
          //console.log({res})
          await services.thirdParty.mail.sendMail(mailObj);
          logger.info("Mail sent: ");
        })
        .catch(err => {
          logger.error(err);
        });
    } catch (error) {
      logger.error("MAIL_ERROR: ", error);
    }
  });

  pubSub.on("send-download-mail", async data => {
    console.log("Advance export was triggered: ");
    const { email, first_name, filename } = data;
    const mObj = {
      to: email,
      from: env.SENDGRID_ADMIN_EMAIL, // Use the email address or domain you verified above
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    try {
      //await MailerServices.sendMail(data);
      await services.thirdParty.mail.sendMail(mailObj);
      console.log("Mail sent: ");
    } catch (error) {
      return res.status(200).json(error);
    }
  });

  return pubSub;
};
