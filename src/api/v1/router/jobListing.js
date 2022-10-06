const {BASE_URI} = require("./../../../config/env");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ENDPOINT = `${BASE_URI}jobListing/`;
module.exports = (route, {jobListingController}, middleware) => {
    route.get(`${ENDPOINT}test`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.test)),
    route.post(`${ENDPOINT}create`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.create)),
    route.post(`${ENDPOINT}createMany`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.createMany)),
    route.get(`${ENDPOINT}getAll`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.getAll)),
    route.get(`${ENDPOINT}getOne`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.getOne)), 
    route.put(`${ENDPOINT}updateOne`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.updateOne))
    //route.put(`${ENDPOINT}updateMany`, jobListingController.updateManyOpening)
}