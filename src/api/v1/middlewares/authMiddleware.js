const {NotFoundError } = require("./../../../utils/errors");
const { asyncMiddleware } = require("../helpers/asyncTryCatchWrapper");

module.exports = function AuthMiddleware(logger, services) {
  return function authTokenMiddleware(scope){
    return asyncMiddleware(async (req, res, next) => {
      
      try {
        const authHeader = req.headers.authorization;
        let userId;

        // if it's an access token
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7, authHeader.length);

          // we validate the token
          const payload = await services.sessionAuth.validateAccessToken(token, scope);

          userId = payload.data.userId;
          req.sessionAuth_id = payload.data.sessionAuthId;
        } else if (authHeader || req.body.api_key || req.query.api_key) {
          const token = authHeader || req.body.api_key || req.query.api_key;
          // we validate the token
          const sessionAuth = await services.sessionAuth.validateApiKey(token, scope);
          userId = sessionAuth.data.user;
        } else {
          throw new NotFoundError('No authorization header or api key found');
        }
        // we get the user in DB
        const foundUser = await services.user.getOne({_id: userId});
        req.user = foundUser.data;

        logger.info(`user: `,req.user)

        next();
      } catch (e) {
        if (e instanceof NotFoundError) {
          throw e;
        }
        throw new NotFoundError(`Error: ${e}`);
      }
    })
  };
};
