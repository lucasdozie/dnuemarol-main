const Dnuemarol = require("./dnuemarol")
//const ThirdParty = require("./thirdparty");
module.exports = function services(dependencies, logger, getConfig, utils){
    
    return {
        dnuemarol:  Dnuemarol(getConfig, logger),
    //    thirdParty: new ThirdParty()
    }
}