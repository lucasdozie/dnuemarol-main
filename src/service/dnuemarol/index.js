const Organization = require("./organization");
const SessionAuth = require("./sessionAuth");
const User = require("./user");
//const Auth = require("./auth");

module.exports = function dnuemarolService(config, logger) {
    const API_URL = config.env.DNUEMA_ORGANIZATION_MS_URL;
    return Object.freeze({
        organization: Organization(API_URL, logger),
        sessionAuth: SessionAuth(API_URL, config.env.JWT_SECRET, logger),
        user: User(API_URL, logger)
    })
}