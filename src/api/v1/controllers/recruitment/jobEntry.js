"use strict";
module.exports = function JobEntryController(usesCases, logger){
  async function test(req, res, next) {
    return res.status(200).json({ message: "welcome to jobEntry endpoint" });
  }
  
  async function create(req, res, next) {
    logger.info(" | create controllers | ")
    const foundData = await usesCases.jobEntry.insertOne(req.body);
    return res.status(200).json(foundData);
  }

  async function createMany(req, res, next) {
    const foundData = await usesCases.jobEntry.insertMany(req.body);
    return res.status(200).json(foundData);
  }
  
  async function getAll(req, res, next){
    logger.info("init getall")
      const foundData = await usesCases.jobEntry.getAll({});
      return res.status(200).json(foundData);
  }

  async function getOne(req, res, next){
    const foundData = await usesCases.jobEntry.getOne({});
    return res.status(200).json(foundData);
  }
  
  async function updateOne(req, res, next) {
    const query = req.query;
    const foundData = await usesCases.jobEntry.updateOne(query, Object.assign({}, req.body, { updated_at: Date.now() }), {
      new: true,
      upsert: false,
    });
    return res.status(200).json(foundData);
  }

  async function updateMany(req, res, next) {
    const query = req.query;
    const foundData = await usesCases.jobEntry.updateMany(query, Object.assign({}, req.body, { updated_at: Date.now() }), {
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