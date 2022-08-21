const axios = require("axios");
//const Promise = require("bluebird")

module.exports = function OrganizationService(MAIN_API_URL = ""){ //MAIN_API_URL
    function getAll(request){
        const options = {
            data: request.params,
            headers: request.headers
        }
        return new Promise((resolve, reject) => {
            axios.get(`${MAIN_API_URL}organization/getAll`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        // return Promise.resolve(axios.get(`${MAIN_API_URL}/getAll`, options)).catch(err => {
        //     if (err instanceof Error) {
        //         throw err;
        //       }
        //       throw new Error(`Error: ${err}`);
        // });
    }
    return Object.freeze({
        getAll
    })
}