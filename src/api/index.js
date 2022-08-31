const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const routes = require("./v1/router")
const {cls, setAdminDb} = require("./v1/middlewares/connectionResolver")

const starterConfig = require("./v1/starter/config")
const starterRoutes = require("./v1/starter/routes")

module.exports = function start(dnuema, port, options){
    
    const {config, controller, middleware} = dnuema
    const {env, logger} = config
    const app = express();
    const router = express.Router();

    app.use([`${env.BASE_URI}user`, `${env.BASE_URI}payroll`], cls)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    if (process.env.NODE_ENV !== "production") {
        app.use(morgan("combined"));
    } else {
        // create a write stream (in append mode)
        const accessLogStream = fs.createWriteStream(
            path.join(__dirname, "access.log"),
            {
                flags: "a",
            }
        );
        app.use(morgan("combined", { stream: accessLogStream }));
    }

    app.use(router);
    

    app.use(cors());

    starterConfig(app)
    starterRoutes(app)

    logger.info(`load all routes... now `)

    routes.load(router, controller, middleware);

    logger.info(`now listen after loading all routes`)

    app.listen(port, () => {
        logger.info(`Listening on port ${port}`)
    })

    return {app}
}