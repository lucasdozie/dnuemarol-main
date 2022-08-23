const { getNamespace } = require('continuation-local-storage')
const getConfigEnv = require("./../config/env");
//const {default: logger} = require("./../config/logger");
import logger from "./../config/logger"

const dnuemarolService = require('./dnuemarol/api')

const connectionFactory = require('../config/database')
const connectionFactoryAdmin = require('../config/databaseAdmin');

function DbConnectionService(){
    let tenantMapping = {};
    let mainDbInstance;

    const getConnection = () => getNamespace('tenants').get('connection') || null

    /**
     * @description {*} Inittiate main & all tenant connections
     * @return {void}
    */
    const bootstrap = async () => {
        try {
          //get all admin model from another service
          const dnuemarolServiceInstance = new dnuemarolService(getConfigEnv)
         
          const organization = await dnuemarolServiceInstance.organization.getAll({});

           
            if(!organization || organization.data?.length < 1) throw new Error("No tenant/Organization was found")
            //@todo - connect to the current tenant(one) instead of all tenant for each server instance
            // seem pretty difficult now, we can't know which tenant/org to connect until they start requesting for thier resource 
            await connectOtherOrg(organization.data);
            logger.info(`Connecting to (${organization.data.length}) database...`);
          //  return tenantMapping;
        } catch (e) {
            console.error(e)
        }
    }

    const connectOtherOrg = async (data) => {
        if(!data) throw new Error("No Organizations found");
        return data.map(async (tenant, i) => {
            const initDb = await selectDB(tenant?.tenantInfo.db_url);
            tenantMapping[tenant.name.toLowerCase()] = initDb;
            return {
              [tenant.name]: initDb,
            };
          })
          .reduce((prev, next) => {
            return Object.assign({}, prev, next);
          }, {});
    }

    const selectDB = async (uri, admin = false) => {
      if(admin){
        return await connectionFactoryAdmin(uri);
      }
      return await connectionFactory(uri)
    }

      //@todo - seperate admin(owner) request from regular customer request
      const getTenantConnection = organizationName => {
        if (tenantMapping && !tenantMapping[organizationName]) {
          throw new Error("Organization not found ",organizationName);
        }else{
          return tenantMapping[organizationName];
        }
      };


    /**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection2 = () => {
    const nameSpace = getNamespace("tenants");
    const conn = nameSpace.get("connection");
    if (!conn) {
      throw new Error("Connection is not set for any tenant database");
    }
  
    return conn;
  };

  /**
 * Get the admin db connection.
 */
  const getAdminConnection = () => {
    if (mainDbInstance) {
        logger.info("Getting adminDbConnection");
      return mainDbInstance;
    }
  };

  

    return Object.freeze({
        getTenantConnection: getTenantConnection,
        bootstrap: bootstrap,
        getConnection: getConnection,
        getConnection2,
        getAdminConnection
    });
}

module.exports = DbConnectionService();