//const migrateDB = require("./")
const configEnv = require("./config/env")
const Dnuemarol = require("./lib");
const startServer = require("./api");

(async () => {
    //start server
    const dnuemarol = Dnuemarol({
        jwtSecret: configEnv.JWT_SECRET
    });

    //console.log({keys: Object.keys(dnuemarol)})

    //init app lib and cores
    await dnuemarol.start();

    //start api server
    startServer(dnuemarol, dnuemarol.config.env.PORT)
})()