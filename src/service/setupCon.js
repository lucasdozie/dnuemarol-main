"use strict";
const dnuemarolService = require("./dnuemarol");
module.exports = function SetupConnection(database, logger) {
  let tenantMapping = {};
  let mainDbInstance;

  async function bootstrap(getConfig) {
    try {
      const imsServiceInstance = new dnuemarolService(getConfig);
      const organization = await imsServiceInstance.organization.getAll({});
      //if(!organization || organization.length < 1) throw new Error("No tenant/Organization was found");
      await connectOtherOrg(organization.data);
      logger.info(`Connecting to (${organization.data.length}) database...`);
      //  return tenantMapping;
    } catch (error) {
      logger.error(`Admin DB connectiong error: ${error}`);
    }
  }

  async function connectOtherOrg(data) {
    if (!data) throw new Error("No Organizations found");
    return data
      .map(async (tenant, i) => {
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

  function getAdminConnection() {
    if (mainDbInstance) {
      logger.info("Getting adminDbConnection");
      return mainDbInstance;
    }
  }

  function getTenantConnection(organizationName) {
    if (tenantMapping && !tenantMapping[organizationName]) {
      throw new Error("Organization not found ", organizationName);
    } else {
      return tenantMapping[organizationName];
    }
  }

  async function connectOneOrg(data) {
    if (!data) throw new Error("Input can not be empty or null");
    const initDb = await selectDB(data?.tenantInfo.db_url);
    tenantMapping[data.name.toLowerCase()] = initDb;
    console.log({ len: tenantMapping.length, data, initDb });
    return initDb;
  }

  async function selectDB(uri, admin = false) {
    if (!admin) return database.connectdb(uri);
    return await database.connectAdmindb(uri);
  }

  return Object.freeze({
    getTenantConnection,
    bootstrap,
    getAdminConnection,
    connectOneOrg,
  });
};