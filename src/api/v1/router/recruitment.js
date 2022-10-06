module.exports = (route, {recruitmentController}, middleware) => {
    route.get(`test`, (req, res, next) => console.log("Test Okr")),
    route.get(`getAll`, recruitmentController.getAll)
}