"use strict"
const jsonwebtoken = require("jsonwebtoken");
//const { UnauthorizedError, NotFoundError } = require("./../utils/errors");
const { asyncMiddleware } = require("./../helpers/asyncTryCatchWrapper");
//const { validateApiKey } = require("./../helpers/session/verifyApikey");
module.exports = function AuthMiddleware() {
    return asyncMiddleware(async (req, res, next) => {
      try {
        const authHeader = req.headers.access_token || req.headers.authorization;
        let user;
        //console.log({authHeader, headers: req.headers, api: req.headers.api_key})
        // if it's an access token
        if (authHeader && authHeader.startsWith("JWT ")) { //Authentication - ID Token (OpenID connect ~ OIDC)
          //Bearer
          // console.log("Inside authHeader");
          const token = authHeader.substring(4, authHeader.length);
          // console.log({token});
          user = jsonwebtoken.verify(token, process.env.PUBLIC_JWT_SECRET);
        } else if ( //Authorization - accessToken Oauth2 (scopes & permissions to resources)
          authHeader ||
          req.headers?.api_key ||
          req.body?.api_key ||
          req.query?.api_key
        ) {
          //console.log("Inside else if api_key");
          const token =
            authHeader ||
            req.headers.api_key ||
            req.body.api_key ||
            req.query.api_key;
          //console.log({ token });
        //  user = await validateApiKey(token); //validate/authorize accessToken and retrive user bio data ;//await gladys.session.validateApiKey(token, scope);//verify api_key to get userId
          user = undefined;
        } else {
          user = undefined; //work on unauthenticatedRequest
        }
  
        // we get the user/organization<superAdmin> in DB
        //console.log({user})
        req.user = user;
        next();
      } catch (err) {
        next(err);
      }
    });
  };