const Dnuemarol = require("./dnuemarol/api")
//const ThirdParty = require("./thirdparty");
module.exports = function services(DNUEMA_ORGANOZATION_MS_URL){
    return {
        dnuemarol:  Dnuemarol(DNUEMA_ORGANOZATION_MS_URL),
    //    thirdParty: new ThirdParty()
    }
}