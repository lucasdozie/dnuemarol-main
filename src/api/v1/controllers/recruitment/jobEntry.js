"use strict";
module.exports = function JobEntryController(usesCases, logger, utils, config, subscriber){
  async function test(req, res, next) {
    return res.status(200).json({ message: "welcome to jobEntry endpoint" });
  }
  
  //@todo - add Acid transaction to revert initially successful task if the the next/current one breaks
  async function create(req, res, next) {
    logger.info(" | create controllers | ")//,{reqKey: Object.keys(req)}, req.body);
    const {first_name, middle_name, last_name,
      phone_number,dob,email,address, state,
      gender, expectedSalary,degree, tertiary,
      currentRole, yearsOfExperience, skill} = req.body;

    let candidate = {
      first_name,
      middle_name,
      last_name,
      phone_number,
      dob,
      email,
      address,
      state,
      gender,
      expectedSalary,
      degree,
      tertiary,
      currentRole,
      yearsOfExperience,
      skill,
    };

    
    const user = await usesCases.dnuemarol.user.createOne(Object.assign({role: "candidate", password: config.env.DEFAULT_USER_PASS}, {...candidate}), req.headers);
    candidate["id"] = user.data._id;
    console.log({candidate, user});
    const foundData = await usesCases.jobEntry.insertOne(Object.assign({}, {candidate}, req.body));
    //@todo we can have user to run as job later

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