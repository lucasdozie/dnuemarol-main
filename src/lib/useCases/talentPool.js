"use strict";

const { NotFoundError } = require("../../utils/errors");
const { successResponse } = require("../../utils/httpStatus");

/**
 * @name TalentPoolUseCases
 * @private
 */
module.exports = function TalentPoolUseCases(
  { jobEntryRepo },
  logger,
  redisClient
) {
  async function insertOne(reqData) {
    const modelInstance = await jobEntryRepo.create(reqData);
    const data = await jobEntryRepo.save(modelInstance);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function insertMany(reqData, ordered) {
    const data = await jobEntryRepo.createMany(reqData, ordered);
    logger.info("data......", { data });
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function getOne(query) {
    const data = await jobEntryRepo.findOne(query);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function getAll(query, queryTimeoutMs = 6000) {
    const data = await jobEntryRepo.findAll(query, queryTimeoutMs);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }

  async function getAndUpdate(query, updateObj, others) {
    const data = await jobEntryRepo.findOneByIdAndUpdate(
      query,
      updateObj,
      others
    );
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR ${data}`);
    }
    return successResponse({ data });
  }
  async function getModelKeys() {
    const data = await jobEntryRepo.findModelKeys();
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function countDocument(query) {
    const totalDocCount = await jobEntryRepo.countDocuments(query);
    if (!totalDocCount) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return totalDocCount;
  }
  async function getAllWithParams(query, paginate) {
    const data = await jobEntryRepo.findAllWithParams(query, paginate);
    const totalDocCount = await jobEntryRepo.countDocuments(query);
    const { page, nPerPage } = paginate;
    const meta = {
      totalDocCount,
      nPerPage,
      page,
      pageCount: data?.length
    };
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data, meta });
  }

  async function updateMany(query, updateObj, others) {
    const data = await jobEntryRepo.modifyMany(query, updateObj, others);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function updateOne(query, updateObj, others) {
    const data = await jobEntryRepo.modifyOne(query, updateObj, others);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function removeMany(query) {
    const data = await jobEntryRepo.deleteMany(query);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function removeOne(query) {
    const data = await jobEntryRepo.deleteOne(query);
    if (!data) {
      throw new NotFoundError(`JOBENTRY_ERROR: ${data}`);
    }
    return successResponse({ data });
  }

  return Object.freeze({
    insertOne,
    insertMany,
    getAll,
    getOne,
    getAndUpdate,
    getModelKeys,
    getAllWithParams,
    updateMany,
    updateOne,
    removeMany,
    removeOne,
    countDocument
  });
};