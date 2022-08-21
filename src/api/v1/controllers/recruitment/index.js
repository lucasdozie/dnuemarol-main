"use strict";
module.exports = function RecruitmentController({recruitmentService}, logger){
  async function test(req, res, next) {
    return res.status(200).json({ message: "welcome to payroll endpoint" });
  }
  
  async function create(req, res, next) {
    logger.info(" | create payroll controllers | ")
    const foundData = await recruitmentService.insertOne(req.body);
    return res.status(200).json(foundData);
  }
  
  async function getAll(req, res, next){
    logger.info("init getall paroll")
      const foundData = await recruitmentService.getAll({});
      return res.status(200).json(foundData);
  }
  
  async function update(req, res, next) {
    logger.info("================= || =========");
    const query = req.query;
    const updateObj = Object.assign({}, req.body, { updated_at: Date.now() });
  
    logger.info({query, updateObj});
    const foundData = await recruitmentService.updateOne(query, updateObj, {
      new: true,
      upsert: false,
    });
    return res.status(200).json(foundData);
  }
  
  async function updateAndgetSequenceNextValue(req, res, next) {
    const paramsOption = Object.assign({}, req.query);
    console.log("entry: ", paramsOption);
    const foundData = await recruitmentService.updateAndgetSequenceNextValue(
      paramsOption
    );
    return res.status(200).json(foundData);
  }
  
  const getSequenceNextValue = async (sName, organization = null) => {
    const responseD = await createCounterOnly(sName, 0, organization);
    if (responseD === -1) {
      return null;
    }
    const query = Object.assign({}, { _id: sName, organization });
    const update = { $inc: { sequence_value: 1 } };
  
    return res.status(200).json({message: "Object was successfully updated"});
  };
  
  return Object.freeze({
    test,
    create,
    update,
    getAll,
    updateAndgetSequenceNextValue,
    getSequenceNextValue,
  });
}