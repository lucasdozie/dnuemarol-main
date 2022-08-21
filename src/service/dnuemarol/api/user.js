const axios = require("axios");

module.exports = function UserService(MAIN_API_URL = ""){ //MAIN_API_URL
    const NEW_MAIN_API_URL =`${MAIN_API_URL}user/`;
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
    return Object.freeze({
        getAll,
        getOne
    })
}