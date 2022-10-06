"use strict";

const { NotFoundError } = require("../../utils/errors");
const { successResponse } = require("../../utils/httpStatus");

/**
 * @name JobListingUseCases
 * @private
 */
module.exports = function JobListingUseCases(
  { jobListingRepo },
  logger,
  redisClient
) {
  async function insertOne(reqData) {
    const modelInstance = await jobListingRepo.create(reqData);
    const data = await jobListingRepo.save(modelInstance);
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function insertMany(reqData, ordered) {
    const data = await jobListingRepo.createMany(reqData, ordered);
    logger.info("data......", { data });
    if (!data || data?.statusCode == 404) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function getOne(query) {
    const data = await jobListingRepo.findOne(query);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function getAll(query, queryTimeoutMs = 6000) {
    const data = await jobListingRepo.findAll(query, queryTimeoutMs);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }

  async function getAndUpdate(query, updateObj, others) {
    const data = await jobListingRepo.findOneByIdAndUpdate(
      query,
      updateObj,
      others
    );
    if (!data) {
      throw new NotFoundError("Not found ");
    }
    return successResponse({ data });
  }
  async function getModelKeys() {
    const data = await jobListingRepo.findModelKeys();
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function countDocument(query) {
    const totalDocCount = await jobListingRepo.countDocuments(query);
    if (!totalDocCount) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return totalDocCount;
  }
  async function getAllWithParams(query, paginate) {
    const data = await jobListingRepo.findAllWithParams(query, paginate);
    const totalDocCount = await jobListingRepo.countDocuments(query);
    const { page, nPerPage } = paginate;
    const meta = {
      totalDocCount,
      nPerPage,
      page,
      pageCount: data?.length
    };
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data, meta });
  }

  async function updateMany(query, updateObj, others) {
    const data = await jobListingRepo.modifyMany(query, updateObj, others);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function updateOne(query, updateObj, others) {
    const data = await jobListingRepo.modifyOne(query, updateObj, others);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function removeMany(query) {
    const data = await jobListingRepo.deleteMany(query);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
    }
    return successResponse({ data });
  }
  async function removeOne(query) {
    const data = await jobListingRepo.deleteOne(query);
    if (!data) {
      throw new NotFoundError(`JOBLISTING_ERROR: ${data}`);
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