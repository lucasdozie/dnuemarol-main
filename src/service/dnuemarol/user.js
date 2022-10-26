const axios = require("axios");

module.exports = function UserService(MAIN_API_URL = ""){ //MAIN_API_URL
    const NEW_MAIN_API_URL =`${MAIN_API_URL}user/`;
    function getAll(request){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            params: {id: "6304fcddab4995d76ef1f2c0"},
            headers: {
                "x-nuema-customerid": "glitch"
            }
        })
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}getAll`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
        
    }

    function getOne(query, httpheaders){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            params: query,
            headers: {
                'Content-Type': 'application/json',
                "x-nuema-customerid": httpheaders['x-nuema-customerid'],
                "authorization": httpheaders['authorization']
            //    ...httpheaders
            }
        });
        const url = `${NEW_MAIN_API_URL}getOne`//?id=${options.data._id}`
        console.log(url, options);
        return new Promise((resolve, reject) => {
            axios.get(url, options)
            .then(res => resolve(res.data))
            .catch(err => {
                console.log(err)//, {keys: Object.keys(err)})
                reject(err.response?.data || err.message)
            })
        })
        
    }

    function createOne(payload, httpheaders){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            //params: payload,
            //data: payload,
            headers: {
                'Content-Type': 'application/json',
                "x-nuema-customerid": httpheaders['x-nuema-customerid'],
                "authorization": httpheaders['authorization']
            //    ...httpheaders
            }
        });
        
        const url = `${NEW_MAIN_API_URL}createOneFromJobEntry`//?id=${options.data._id}`
        return new Promise((resolve, reject) => {
            axios.post(url, payload, options)
            .then(res => resolve(res.data))
            .catch(err => {
                console.log({keys: Object.keys(err), message: err.message, request: err.request})
                reject(err.response?.data || err.message)
            })
        })
        
    }

    function test(request){
        const options = Object.assign({}, {
            timeout: 5000,
        }, {
            params: {id: "6304fcddab4995d76ef1f2c0"},
            headers: {
                "x-nuema-customerid": "glitch"
            }
        })
        return new Promise((resolve, reject) => {
            axios.get(`${NEW_MAIN_API_URL}test`, options)
            .then(res => resolve(res.data))
            .catch(err => reject(err?.data))
        })
    }
    
    return Object.freeze({
        getAll,
        getOne,
        createOne,
        test
    })
}