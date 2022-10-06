"use strict";
const { PayrollValidator } = require("../helpers/inputValidator");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { BASE_URI } = require("../../../config/env");

let ENDPOINT = `${BASE_URI}payroll`;
//@todo add a limiter this endpoint 10 times every 30mins window
module.exports = (router, {payrollController}, middleware) => {
    router.get(`${ENDPOINT}/test`, asyncMiddleware(payrollController.test)),
    router.post(
      `${ENDPOINT}/create`,
      PayrollValidator,
      middleware.accessTokenAuth("payroll.write"),
      asyncMiddleware(payrollController.create)
    ),
    router.get(
        `${ENDPOINT}/getall`,
        middleware.accessTokenAuth("payroll.read"),
        asyncMiddleware(payrollController.getAll)
    ),
    router.get(
      `${ENDPOINT}/getone`,
      middleware.accessTokenAuth("payroll.read"),
      asyncMiddleware(payrollController.getOne)
  ),
    router.put(
      `${ENDPOINT}/update`,
      middleware.accessTokenAuth("payroll.edit"),
      PayrollValidator,
      asyncMiddleware(payrollController.update)
    ),
    router.get(
      `${ENDPOINT}/updateAndGetNextValue`,
      middleware.accessTokenAuth("payroll.read"),
      //  loginRequired, //@todo get another authenticator for in-house product communication
      asyncMiddleware(payrollController.updateAndgetSequenceNextValue)
    );
};