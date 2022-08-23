const Organization = require("./organization");
const SessionAuth = require("./sessionAuth");
const User = require("./user");
//const Auth = require("./auth");

module.exports = function dnuemarolService(dnuema_env_var){
    const API_URL = dnuema_env_var.DNUEMA_ORGANIZATION_MS_URL;
    return Object.freeze({
        organization: Organization(API_URL),
        sessionAuth: SessionAuth(API_URL, dnuema_env_var.JWT_SECRET),
        user: User(API_URL)
    })
}