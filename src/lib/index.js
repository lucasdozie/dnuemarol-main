const redis = require("redis");
const Promise = require("bluebird");

import logger from "./../config/logger"
//const { DNUEMA_ORGANOZATION_MS_URL } = require("./../config/env");
const getConnection = require("./../utils/dbConn")

const getConfig = require("./../config/")
const getControllers = require("./../api/v1/controllers/")
const getDatarepos = require("./../api/v1/dataRepository/")
const getMiddlewares = require("./../api/v1/middlewares/")
const getServices = require("./../service") 
const getUseCases = require("./useCases") //useCase replaces service, while service will be tailored towards 3rd party and other micro services intergartions 
//const getHelper = require("./../api/v1/helpers")

//conn service for multi tenant setup
const getDbConnectionServices = require("./../service/dbConnection")

function Dnuemarol(params){
    Promise.promisifyAll(redis);
    params.jwtSecret = params.jwtSecret// || getConfig.env.JWT_SECRET; //generate a secret instead

    logger.info(`getting the current db connection(s)`)
    const conn = getConnection || {};

    logger.info(`getDatarepos.....`)
    
    const dataRepository = getDatarepos(conn, logger)

    logger.info(`getServices & getUseCases .....`)

    const useCases = getUseCases(dataRepository, logger)

    const services = getServices(getConfig.env)

    logger.info(`getControllers.....`)

    const controller = getControllers(Object.assign({}, useCases, services), logger)//(useCases, services, logger)

    logger.info(`getMiddlewares.....${getConfig.env.REDIS_URI}`)

    const redisClient = redis.createClient({url: getConfig.env.REDIS_URI});
    (async function(){
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
    })();

    const middleware = getMiddlewares(logger, services.dnuemarol, redisClient);

    //const helpers = getHelper(services, logger);

    const dnuemarol = {
        version: '1.0', //todo - add version from package.json
        dataRepository,
        useCases,
        services,
        controller,
        middleware,
        config: getConfig,
    //    helpers,
        start: async () => {
            logger.info(`initiating main db connection.`)
            await getDbConnectionServices.bootstrap()

        }

    }
    return Object.freeze(dnuemarol)
}

module.exports = Dnuemarol;