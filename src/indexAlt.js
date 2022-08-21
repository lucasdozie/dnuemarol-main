"use strict"
const cluster = require("./config/cluster");
const {default: logger} = require("./config/logger");
const app = require("./app")
const {PORT} = require("./config/env")

// cluster(() => {
//     app
//     const server = app.listen(PORT, () => {
//            // console.log(`Express listening on port: ${port}`);
//         console.log(`Worker ${process.pid} started on port ${PORT}`);
//     });  
// })

const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));

module.exports = server;