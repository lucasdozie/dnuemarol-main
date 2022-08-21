"use strict";

const { NotFoundError } = require("../../utils/errors");
const { successResponse } = require("../../utils/httpStatus");
/**
 * @name PayrollService
 * @private
 */
module.exports = function RecruitmentService({recruitmentRepo}, logger) {
  async function insertOne(reqData) {
    const modelInstance = await recruitmentRepo.create(reqData);
    const data = await recruitmentRepo.save(modelInstance);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`Payroll NOT FOUND: ${data}`);
    }
    return successResponse({ data });
  }
  
  async function insertMany(reqData, ordered) {
    const data = await recruitmentRepo.createMany(reqData, ordered);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`ERROR: ${data}`);
    }
    return successResponse({ data });
  }

  async function getAll(query, queryTimeoutMs = 6000) {
    logger.info("init getall paroll service");
    const data = await recruitmentRepo.findAll(query, queryTimeoutMs);
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }

  async function getOne(query) {
    const data = await recruitmentRepo.findOne(query);
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }

  async function getAndUpdate(query, updateObj, others) {
    const data = await recruitmentRepo.findOneByIdAndUpdate(query, updateObj, others);
    if (!data) {
      throw new NotFoundError("Not found ");
    }
    return successResponse({ data });
  }
  
  async function updateMany(query, updateObj, others) {
    const data = await recruitmentRepo.modifyMany(query, updateObj, others);
    if (!data) {
      throw new NotFoundError("Not found ");
    }
    return successResponse({ data });
  }

  async function getModelKeys() {
    const data = await recruitmentRepo.findModelKeys();
    if (!data) {
      throw new NotFoundError("Not found");
    }
    return successResponse({ data });
  }
  
  async function getAllWithParams(query, paginate) {
    const data = await recruitmentRepo.findAllWithParams(query, paginate);
    const totalDocCount = await recruitmentRepo.countDocuments(query);
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
