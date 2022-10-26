const {BASE_URI} = require("./../../../config/env");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
//we handle creating individual Test, creating and adding test to assessmentSuite.
const ENDPOINT = `${BASE_URI}assessment/`;
module.exports = (route, {assessmentController}, middleware) => {
    route.get(`${ENDPOINT}test`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(assessmentController.test)),
    route.post(`${ENDPOINT}initiate`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(assessmentController.create))//assessment/initiate
    route.put(`${ENDPOINT}addTest`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(assessmentController.addTest))
    route.post(`${ENDPOINT}createTest`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(assessmentController.createTest))
    
    route.patch(`${ENDPOINT}candidateTestEntry/question/:questionId`, middleware.accessTokenAuth("jobListing.read"), asyncMiddleware(assessmentController.candidateTestEntry))
}