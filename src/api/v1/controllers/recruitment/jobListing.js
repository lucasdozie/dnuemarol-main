"use strict";
module.exports = function JobListingController(usesCases, logger){
  async function test(req, res, next) {
    return res.status(200).json({ message: "welcome to jobListing endpoint" });
  }
  
  async function create(req, res, next) {
    logger.info(" | create controllers | ")
    const foundData = await usesCases.jobListing.insertOne(req.body);
    return res.status(200).json(foundData);
  }

  async function createMany(req, res, next) {
    const foundData = await usesCases.jobListing.insertMany(req.body);
    return res.status(200).json(foundData);
  }
  
  async function getAll(req, res, next){
      const foundData = await usesCases.jobListing.getAll({});
      return res.status(200).json(foundData);
  }
  async function getOne(req, res, next){
      const foundData = await usesCases.jobListing.getOne({});
      return res.status(200).json(foundData);
  }
  
  async function updateOne(req, res, next) {
    const query = req.query;
    const foundData = await usesCases.jobListing.updateOne(query, Object.assign({}, req.body, { updated_at: Date.now() }), {
      new: true,
      upsert: false,
    });
    return res.status(200).json(foundData);
  }

  async function updateMany(req, res, next) {
    const query = req.query;
    const foundData = await usesCases.jobListing.updateMany(query, Object.assign({}, req.body, { updated_at: Date.now() }), {
      new: true,
      upsert: false,
    });
    return res.status(200).json(foundData);
  }
  
  return Object.freeze({
    test,
    create,
    createMany,
    updateOne,
    updateMany,
    getOne,
    getAll
  });
}