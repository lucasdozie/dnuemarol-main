const axios = require("axios");

module.exports = function SessionAuthService(MAIN_API_URL = ""){ //MAIN_API_URL
    const NEW_MAIN_API_URL =`${MAIN_API_URL}sessionauth/`;
    function getAll(request){
        const options = {
            data: request.params,
            headers: request.headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}getAll`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }

    function getOne(request){
        const options = {
            data: request.params,
            headers: request.headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}getOne`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }

    function validateAccessToken(request){
        const options = {
            data: request.params,
            headers: request.headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}validateAccessToken`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }

    function validateApiKey(request){
        const options = {
            data: request.params,
            headers: request.headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}validateApiKey`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }
    return Object.freeze({
        getAll,
        getOne,
        validateAccessToken,
        validateApiKey
    })
}