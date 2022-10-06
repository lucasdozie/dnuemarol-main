const redis = require("redis");
const Promise = require("bluebird");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const cls =require("continuation-local-storage");
const eventEmitter = require("events");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
const sgMail = require("@sendgrid/mail");
const emailTemplate = require("email-templates");
const path = require("path");

import logger from "./../config/logger"
const getUtils = require("./../utils");
const getModelSchema = require("./models/schema");
const getDatabase = require("../config/database");

const getConnection = require("./../utils/dbConn")

const getConfig = require("./../config/");
const getSubscriber = require("./../subscriber");

const getControllers = require("./../api/v1/controllers/")
const getDatarepos = require("./dataRepository")
const getMiddlewares = require("./../api/v1/middlewares/")
const getServices = require("./../service") 
const getUseCases = require("./useCases") //useCase replaces service, while service will be tailored towards 3rd party and other micro services intergartions 
const connectionResolver = require("../config/connectionResolver");

//conn service for multi tenant setup
const setupConnection = require("./../service/setupCon");
//const getDbConnectionServices = require("./../service/dbConnection")

function Dnuemarol(params){
    Promise.promisifyAll(redis);
    params.jwtSecret = params.jwtSecret// || getConfig.env.JWT_SECRET; //generate a secret instead

    logger.info(`getting the current db connection(s)`)

    const utils = getUtils({bcrypt,crypto}, logger);

    const modelSchemas = getModelSchema(mongoose, getConfig, utils, logger);

    const databaseConn = getDatabase(mongoose, modelSchemas, logger);

    const setupInstance = setupConnection(databaseConn, logger);
    const conResolver = connectionResolver(cls, setupInstance, logger);

    const conn = getConnection || {};

    logger.info(`getDatarepos.....`)
    
    const dataRepository = getDatarepos(conResolver.getConnection, logger)

    logger.info(`getServices & getUseCases .....`)

    const redisClient = redis.createClient({url: getConfig.env.REDIS_URI});
    (async function(){
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
    })();

    const useCases = getUseCases(dataRepository, logger, redisClient, params.jwtSecret, mongoose, utils, getConfig)

   const services = getServices({sgMail, emailTemplate, path, //multer, AWS, multerS3
}, logger, getConfig, utils);
    logger.info(`getControllers.....`)

    const subscriber = getSubscriber(eventEmitter, setupInstance, Object.assign({}, useCases, services), getConfig);

    const controller = getControllers(Object.assign({}, useCases, services), logger, subscriber)//(useCases, services, logger)

    const middleware = getMiddlewares(logger, Object.assign({}, useCases, services), redisClient);

    //const helpers = getHelper(services, logger);

    const dnuemarol = {
        version: '1.0', //todo - add version from package.json
        dataRepository,
        useCases,
        services,
        controller,
        middleware,
        config: getConfig,
        conResolver,
    //    helpers,
        start: async () => {
            logger.info(`initiating main db connection.`)
            //await getDbConnectionServices.bootstrap()
            await setupInstance.bootstrap(getConfig);
        }

    }
    return Object.freeze(dnuemarol)
}

module.exports = Dnuemarol;