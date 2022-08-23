const Dnuemarol = require("./dnuemarol/api")
//const ThirdParty = require("./thirdparty");
module.exports = function services(dnuema_env){
    return {
        dnuemarol:  Dnuemarol(dnuema_env),
    //    thirdParty: new ThirdParty()
    }
}