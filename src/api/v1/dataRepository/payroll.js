"use strict";
//@todo replace this with some sort of library 
/**
 * @example http dnuemarol.prototypes.db = await dnuemarol-main()
 * dnuemarolMain.db.getConnection, dnuemarol.services.organization, dnuemarol.services.auth, dnuemarol.utils.calender, duemarol.helper.inputValidator
*/
const { MODELSCHEMAKEYS } = require("./../helpers/blacklist");

module.exports = function PayrollRepo(getConn, logger) {
    /**
     * @name create
     * @param {Object} reqBody
     * @public
     **/
    const create = async function (reqBody = {}) {
        logger.info("create repo....")
        const model = getConn().model("Payroll");
        return await new model(reqBody)
    };

    /**
     * @name save
     * @param {Object} createInstance
     * @private
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
    const createMany = async function (reqBody = [], ordered = false) {
        const model = getConn().model("Payroll");
        return await model.insertMany(reqBody, { ordered }, (error, docs) => {
            if (error) {
            //console.log("error:. ", error);
            return { message: error };
            }
            if (docs) {
            console.log("docs:. ", docs);
            return { data: docs };
            //@todo
            }
        });
    };

    /**
     * @name countDocuments
     * @param {Object} reqBody
     * @param {boolean} ordered
     * @public
     * */
    const countDocuments = async (query = {}) => {
        const model = getConn().model("Payroll");
        return await model.countDocuments(query);
    };

    /**
     * @name findAllWithParams
     * @param {object} query
     * @param {boolean} paginate
     * @public
     * */
    const findAllWithParams = async (query = () => {}, paginate = {}) => {
        const { page, nPerPage } = paginate;
        const model = getConn().model("Payroll");
        return await model.find(query)
            .sort({ created_at: -1 })
            .skip(Math.abs((page - 1) * nPerPage))
            .limit(nPerPage)
            .select(" -__v");
    };

    /**
     * @name findAll
     * @param {Object} query
     * @param {boolean} timeMS
     * @public
     * */
    const findAll = async (query = () => {}, timeMS = 1000) => {
        console.time("QUERY_TIME");
        const model = getConn().model("Payroll");
        const foundData = await model.find(query)
            .sort({ created_at: -1 })
            .select("-__v")
            .lean()
            .maxTimeMS(timeMS);
        console.timeEnd("QUERY_TIME");
        return foundData;
    };

    /**
     * @name findOne
     * @param {Object} query
     * @public
     * @return {Object}
     * */
    const findOne = async (query = () => {}, timeMS = 1000) => {
        console.time("QUERY_TIME");
        const model = getConn().model("Payroll");
        const foundData = await model.findOne(query)
            .sort({ created_at: -1 })
            .select("-__v")
            .lean()
            .maxTimeMS(timeMS);
        console.timeEnd("QUERY_TIME");
        return foundData;
    };

    const findOneByIdAndUpdate = async (
        query = () => {},
        update = {},
        other = {}
        ) => {
            const model = getConn().model("Payroll");
        const foundData = await model.findByIdAndUpdate(query, update, other);
        //console.log({foundData})
        return foundData;
    };

    const modifyMany = async (query = () => {}, update = {}, other = {}) => {
        const model = getConn().model("Payroll");
        const foundData = await model.updateMany(query, update, other);
        //console.log({foundData})
        return foundData;
    };

    const findModelKeys = async () => {
        const model = getConn().model("Payroll");
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
        modifyMany,
        findModelKeys,
        countDocuments,
        create,
        createMany,
        save,
    });
}