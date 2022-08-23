"use strict";
module.exports = function PayrollController({payrollService, dnuemarol}, logger){
  async function test(req, res, next) {
    return res.status(200).json({ message: "welcome to payroll endpoint" });
  }
  
  async function create(req, res, next) {
    const foundData = await payrollService.insertOne(req.body);
    return res.status(200).json(foundData);
  }
  
  async function getAll(req, res, next){
    logger.info("init getall paroll");
      const foundData = await payrollService.getAll({});
      return res.status(200).json(foundData);
  }
  
  async function update(req, res, next) {
    const query = req.query;
    const updateObj = Object.assign({}, req.body, { updated_at: Date.now() });
  
    logger.info({query, updateObj});
    const foundData = await payrollService.updateOne(query, updateObj, {
      new: true,
      upsert: false,
    });
    return res.status(200).json(foundData);
  }
  
  async function updateAndgetSequenceNextValue(req, res, next) {
    const paramsOption = Object.assign({}, req.query);
    console.log("entry: ", paramsOption);
    const foundData = await payrollService.updateAndgetSequenceNextValue(
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