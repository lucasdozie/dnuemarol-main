module.exports = (route, controller, middleware) => {
    route.get(`test`, (req, res, next) => console.log("Test Okr")),
    route.get(`getAll`, controller.recruitmentController.getAll)
}