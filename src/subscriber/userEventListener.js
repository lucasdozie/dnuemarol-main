"use strict";

/**
 * @todo connnect to a mail services, and pass the data and email of the admin email address
 */
module.exports = function UserEvent(
  pubSub,
  dbConnectionService,
  constants,
  logger
) {
  pubSub.on(constants.ONBOARDED_ORGANIZATION, async params => {
    console.log("Initalizing... onboarded org ", params);
    try {
      logger.info("Seed questionaire data for, farmer, farmMapping e.t.c");
      //update the organization db, without having to restart the sever
      const dbConnInstance = await dbConnectionService.connectOneOrg(params);
      //console.log({dbConnInstance})
      //seed/create superadmin on the organization
      const UserModel = await dbConnInstance.model("User");
      const OrgCounterModel = await dbConnInstance.model("OrgCounter");
      const createOrgSuperAdmin = await AdminModel.create(params);
      await createOrgSuperAdmin.save();

      const orgCounterInstance = await OrgCounterModel.create(
        Object.assign(
          {},
          {
            sequence_key: "agent_id", //@todo: improve this later
            sequence_value: 0,
            organization: params.organization
          }
        )
      );
      await orgCounterInstance.save();

      //send a 'Welcome' mail to the organization
      console.log("createOrgSuperAdmin....", createOrgSuperAdmin);
    } catch (error) {
      //@todo use an error logger to track event error
      //console.log("ONBOARDED_ORGANIZATION: ", error);
      throw new Error(`Event error: ${error}`);
    }
  });
};
