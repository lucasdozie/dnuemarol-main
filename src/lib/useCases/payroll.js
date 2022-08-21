"use strict";

const { NotFoundError } = require("../../utils/errors");
const { successResponse } = require("../../utils/httpStatus");
/**
 * @name PayrollService
 * @private
 */
module.exports = function PayrollService({payrollRepo}, logger) {
  async function insertOne(reqData) {
    const modelInstance = await payrollRepo.create(reqData);
    const data = await payrollRepo.save(modelInstance);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`Payroll NOT FOUND: ${data}`);
    }
    return successResponse({ data });
  }
  
  async function insertMany(reqData, ordered) {
    const data = await payrollRepo.createMany(reqData, ordered);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`ERROR: ${data}`);
    }
    return successResponse({ data });
  }

  async function getAll(query, queryTimeoutMs = 6000) {
    logger.info("init getall paroll service");
    const data = await payrollRepo.findAll(query, queryTimeoutMs);
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }

  async function getOne(query) {
    const data = await payrollRepo.findOne(query);
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }

  async function getAndUpdate(query, updateObj, others) {
    const data = await payrollRepo.findOneByIdAndUpdate(query, updateObj, others);
    if (!data) {
      throw new NotFoundError("Not found ");
    }
    return successResponse({ data });
  }
  
  async function updateMany(query, updateObj, others) {
    const data = await payrollRepo.modifyMany(query, updateObj, others);
    if (!data) {
      throw new NotFoundError("Not found ");
    }
    return successResponse({ data });
  }

  async function getModelKeys() {
    const data = await payrollRepo.findModelKeys();
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }
  
  async function getAllWithParams(query, paginate) {
    const data = await payrollRepo.findAllWithParams(query, paginate);
    const totalDocCount = await payrollRepo.countDocuments(query);
    const { page, nPerPage } = paginate;
    const meta = {
      totalDocCount,
      nPerPage,
      page,
      pageCount: data?.length,
    };
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data, meta });
  }

  return {
    insertOne,
    insertMany,
    getAll,
    getOne,
    getAndUpdate,
    updateMany,
    getModelKeys,
    getAllWithParams
  }
}
