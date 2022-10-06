"use strict";
const { MODELSCHEMAKEYS } = require("./../../api/v1/helpers/blacklist");

module.exports = function JobEntryRepo(getConn, logger) {
  /**
   * @name create
   * @param {Object} reqBody
   * @public
   * @return {Promise<JobEntry>}
   **/
   const create = async function (reqBody = {}) {
    const model = getConn().model("JobEntry")
    return await new model(reqBody);
  };

  /**
   * @name save
   * @param {Object} createInstance
   * @private
   * @return {Promise<Organizations>}
   * */
  const save = async function (createInstance = {}) {
    return await createInstance.save();
  };

  /**
   * @name createMany
   * @param {Object} reqBody
   * @param {boolean} ordered
   * @public
   * */
  const createMany = async function (reqBody = [], ordered = {}) {
    const model = getConn().model("JobEntry")
    return await model.insertMany(reqBody, ordered);
  };

  /**
   * @name countDocuments
   * @param {Object} reqBody
   * @param {boolean} ordered
   * @public
   * */
  const countDocuments = async (query = {}) => {
    const model = getConn().model("JobEntry")
    return await model.countDocuments(query);
  };

  /**
   * @name findAllWithParams
   * @param {object} query
   * @param {boolean} paginate
   * @public
   * */
  const findAllWithParams = async (query = () => {}, paginate = {}) => {
    let { page, nPerPage } = paginate;
    const model = getConn().model("JobEntry");
    return await model
      .find(query)
      .sort({ created_at: -1 })
      .skip(Math.abs((page - 1) * nPerPage))
      .limit(nPerPage)
      .select(" -__v")
      .populate(
        "user",
        "first_name last_name phone_number email gender state lga district role avatar_url address"
      );
  };

  /**
   * @name findAll
   * @param {Object} query
   * @param {boolean} timeMS
   * @public
   * */
  const findAll = async (query = () => {}, timeMS = 1000) => {
    console.time("QUERY_TIME");
    const model = getConn().model("JobEntry")
    const foundData = await model.find(query)
      .sort({ created_at: -1 })
      .select("-__v")
      .populate(
        "user",
        "first_name last_name phone_number email gender state lga district role avatar_url address"
      )
      .lean()
      .maxTimeMS(timeMS);
    console.timeEnd("QUERY_TIME");
    return foundData;
  };

  const findOne = async (query = () => {}, columnWhiteBlacklist = "-__v") => {
    const model = getConn().model("JobEntry")
    const foundData = await model.findOne(query).select(columnWhiteBlacklist);
    return foundData;
  };

  const findOneByIdAndUpdate = async (
    query = () => {},
    update = {},
    other = {}
  ) => {
    const model = getConn().model("JobEntry");
    const foundData = await model.findByIdAndUpdate(query, update, other);
    //console.log({foundData})
    return foundData;
  };

  const findOneAndUpdate = async (query = () => {}, update = {}, other = {}) => {
    const model = getConn().model("JobEntry");
    const foundData = await model.findOneAndUpdate(query, update, other);
    return foundData;
  };
  
  const modifyMany = async (query = () => {}, update = {}, other = {}) => {
    const model = getConn().model("JobEntry");
    const foundData = await model.updateMany(query, update, other);
    return foundData;
  };
  
  const modifyOne = async (query = () => {}, update = {}, other = {}) => {
    const model = getConn().model("JobEntry");
    const foundData = await model.updateOne(query, update, other);
    return foundData;
  };

  const findModelKeys = async () => {
    const model = getConn().model("JobEntry");
    const schema = await model.schema.paths;
    const keyArray = Object.keys(schema).filter(
      (field) => !MODELSCHEMAKEYS.includes(field)
    );
    return keyArray;
  };
  return Object.freeze({
    findAllWithParams,
    findAll,
    findOne,
    findOneByIdAndUpdate,
    findOneAndUpdate,
    modifyMany,
    modifyOne,
    countDocuments,
    create,
    createMany,
    findModelKeys,
    save,
  });
};