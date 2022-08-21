const Organization = require("./organization");
const SessionAuth = require("./sessionAuth");
const User = require("./user");
//const Auth = require("./auth");

module.exports = function dnuemarolService(API_URL){
    return Object.freeze({
        organization: Organization(API_URL),
        sessionAuth: SessionAuth(API_URL),
        user: User(API_URL)
    })
}