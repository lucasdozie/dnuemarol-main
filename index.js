"use strict"
const cluster = require("./src/config/cluster");
const app = require("./src/app")
const port = 4004;

//todo: use pm2 as a production worker proccessor
//only user cluster if the request is CPU intensive: that way you get better yeild
// cluster(() => {
//     app
//     const server = app.listen(port, () => {
//        // console.log(`Express listening on port: ${port}`);
//         console.log(`Worker ${process.pid} started on port ${port}`);
//     });

    
// })

app
const server = app.listen(port, () => {
    // console.log(`Express listening on port: ${port}`);
    console.log(`Worker ${process.pid} started on port ${port}`);
});

// /**
//  * Setup server either with clustering or without it
//  * @param isClusterRequired
//  * @constructor
//  */
//  const setupServer = (isClusterRequired) => {

//     // if it is a master process then call setting up worker process
//     if(isClusterRequired && cluster.isMaster) {
//         setupWorkerProcesses();
//     } else {
//         // to setup server configurations and share port address for incoming requests
//         setUpExpress();
//     }
// };

// setupServer(true);



module.exports = server