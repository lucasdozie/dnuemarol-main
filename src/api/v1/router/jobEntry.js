const {BASE_URI} = require("./../../../config/env");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ENDPOINT = `${BASE_URI}jobEntry/`; //where candidate submits their application
module.exports = (route, {jobEntryController}, middleware) => {
    route.get(`${ENDPOINT}test`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.test)),
    route.post(`${ENDPOINT}create`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.create)),
    route.post(`${ENDPOINT}createMany`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.createMany)),
    route.get(`${ENDPOINT}getAll`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.getAll)),
    route.get(`${ENDPOINT}getOne`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.getOne)), 
    route.put(`${ENDPOINT}updateOne`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.updateOne)),
    route.put(`${ENDPOINT}updateMany`, middleware.accessTokenAuth("jobEntry.write"), asyncMiddleware(jobEntryController.updateMany))
}