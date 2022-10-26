const {BASE_URI} = require("./../../../config/env");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
//where candidate data get sent to when they submit each question or after they done with everything.
const ENDPOINT = `${BASE_URI}candidateTestEntry/`;
module.exports = (route, {jobListingController}, middleware) => {
    route.get(`${ENDPOINT}test`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.test)),
    route.post(`${ENDPOINT}create`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.create)),
    // route.post(`${ENDPOINT}createMany`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.createMany)),
    // route.get(`${ENDPOINT}getAll`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.getAll)),
    // route.get(`${ENDPOINT}getOne`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(jobListingController.getOne)), 
    route.patch(`${ENDPOINT}question/:questionId`, middleware.accessTokenAuth("jobListing.write"), asyncMiddleware(jobListingController.updateOne))
}