"use strict"
const cluster = require("cluster");
const os = require("os");
module.exports = (callback) => {
    if(cluster.isPrimary){
        console.log(`Primary ${process.pid} is running`);
        const cpus = os.cpus().length //length on CPUs runing on your server
        for (let i = 0; i < cpus; i++) {
            const worker = cluster.fork();
            //listen to message From the worker process
            worker.on("message", (mesage) => {
                console.log(`[${worker.process.pid}] to MASTER`, message)
            })
        }

        cluster.on('exit', (worker, code, signal) => {
            console.warn(`worker [${worker.process.pid}] died `,{code, signal});
            //cluster.fork();
        });
    }else{
        if(callback) callback();
    }
}