const axios = require("axios");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../../../utils/httpStatus");
const {NotFoundError} = require("./../../../utils/errors")

module.exports = function SessionAuthService(MAIN_API_URL = "", JWT_SECRET){ //MAIN_API_URL
    const NEW_MAIN_API_URL =`${MAIN_API_URL}sessionauth/`;
    function getAll(query, httpheaders){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                "x-nuema-customerid": httpheaders['x-nuema-customerid'],
                "authorization": httpheaders['authorization']
            }
        });
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}getAll`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }
    //todo - add an request.headers["x-dnuema-app-secret"] = "dnuemaruegifhivuvwcvugcew8g9wehwvriu38hjdgiuw";
    function getOne(query, httpheaders){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                "x-nuema-customerid": httpheaders['x-nuema-customerid'],
                "authorization": httpheaders['authorization']
            }
        });
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}getOne`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response?.data || err.message))
        })
        
    }

    async function validateAccessToken(accessToken, scope) {
        /**
        * @type {Object} decoded
        **/
        const decoded = jwt.verify(accessToken, JWT_SECRET, {issuer: "dnuemarol", audience: "user"});
    
        if(!decoded) throw new NotFoundError(`Encountered error while verifying accessToken, ${decoded}`);
    
        //verify the required scope(login user) againt the route scope 
        if(decoded.scope.includes(scope) === false){
            throw new Error(`AuthMiddlware scope "${scope}" is not not in the list of authorized scope ${decode.scope}`)
        }

        //todo - working on adding cache, that can persist the data 
        // this.cache.decoded = decoded
        
        return successResponse({ data: decoded });
      }
    
    async function validateApiKey(accessToken, scope, httpheaders) {
        const apiKeyHash = hashRefreshToken(accessToken);

        //make http calls to sessionAuth service
        
        const sessionAuth = await getOne({
            token_hash: apiKeyHash
        }, httpheaders);

        console.log({sessionAuth})
        
        if (sessionAuth.data === null) {
          throw new NotFoundError(`Api key not found`);
        }
        
        if (sessionAuth.data?.valid_until < new Date()) {
          throw new NotFoundError(`Api key has expired`);
        }
        
        if (sessionAuth.data?.revoked) {
          throw new NotFoundError(`Api key was revoked`);
        }
    
        //const data = sessionAuth.user;
        return successResponse({ data: sessionAuth });
    }

    return Object.freeze({
        getAll,
        getOne,
        validateAccessToken,
        validateApiKey
    })
}