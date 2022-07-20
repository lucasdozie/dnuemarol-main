module.exports = (route) => {
    route.get(`test`, (req, res, next) => console.log("Test Okr"))
}