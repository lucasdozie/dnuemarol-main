const express = require('express');
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
const cors = require("cors");
//const fs = require("fs");
const routes = require("./v1/router");

const starterConfig = require("./v1/starter/config")
const starterRoutes = require("./v1/starter/routes")

module.exports = function start(dnuema, port, options){
    
    const {config, controller, conResolver, middleware} = dnuema
    const {env, logger} = config
    const app = express();
    app.use(cors());
    starterConfig(app);
    const router = express.Router();

    app.use([`${env.BASE_URI}user`, `${env.BASE_URI}payroll`], conResolver.resolveCustomer)
    starterRoutes(app);
    app.use(router);
    logger.info(`load all routes... now `)
    routes.load(router, controller, middleware);
    starterRoutes(app);

    app.listen(port, () => {
        logger.info(`Listening on port ${port}`)
    })

    return {app}
}