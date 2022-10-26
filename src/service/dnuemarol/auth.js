const axios = require("axios");
const Promise = require("bluebird");

module.exports = function AuthService(MAIN_API_URL){ //MAIN_API_URL
    function login(params, request){
        const options = {
            data: params,
            headers: request.headers
        }
        return Promise.resolve(axios.get(`${MAIN_API_URL}/getAll`, options)).catch(err => {
            if (e instanceof Error) {
                throw e;
              }
              throw new Error(`Error: ${e}`);
        });
    }

    function register(params, request){
        const options = {
            data: params,
            headers: request.headers
        }
        return Promise.resolve(axios.get(`${MAIN_API_URL}/user/register`, options)).catch(err => {
            if (e instanceof Error) {
                throw e;
              }
              throw new Error(`Error: ${e}`);
        });
    }
    function getAll(params, request){
        const options = {
            data: params,
            headers: request.headers
        }
        return Promise.resolve(axios.get(`${MAIN_API_URL}/getAll`, options)).catch(err => {
            if (e instanceof Error) {
                throw e;
              }
              throw new Error(`Error: ${e}`);
        });
    }
    return Object.freeze({
        login,
        register,
        getAll
    })
}