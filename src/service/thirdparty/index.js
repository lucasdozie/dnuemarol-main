const MailService = require("./mail");
const StripeService = require("./stripe");
const TelegramService = require("./telegram");

module.exorts = function thridPartyService(){
    return Object.freeze({
        mail: new MailService(),
        stripe: new StripeService(),
        telegram: new TelegramService(),
    })
}