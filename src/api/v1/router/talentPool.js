const {BASE_URI} = require("./../../../config/env");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const ENDPOINT = `${BASE_URI}talentPool/`;
module.exports = (route, {talentPoolController}, middleware) => {
    route.get(`${ENDPOINT}test`, asyncMiddleware(talentPoolController.test)),
    route.post(`${ENDPOINT}create`, asyncMiddleware(talentPoolController.create)),
    route.post(`${ENDPOINT}createMany`, asyncMiddleware(talentPoolController.createMany)),
    route.get(`${ENDPOINT}getAll`, asyncMiddleware(talentPoolController.getAll)),
    route.get(`${ENDPOINT}getOne`, asyncMiddleware(talentPoolController.getOne)), 
    route.put(`${ENDPOINT}updateOne`, asyncMiddleware(talentPoolController.updateOne))
    //route.put(`${ENDPOINT}updateMany`, talentPoolController.updateManyOpening)
}