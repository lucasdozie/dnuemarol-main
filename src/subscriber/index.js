module.exports = function Subscriber(
  eventEmitter,
  setupInstance,
  services,
  getConfig
) {
  class EventHanler extends eventEmitter {}
  const pubSubInstance = new EventHanler();

  // require("./userEventListener")(
  //   pubSubInstance,
  //   setupInstance,
  //   getConfig.constants,
  //   getConfig.logger
  // );
  // require("./organizationEventListener")(
  //   pubSubInstance,
  //   setupInstance,
  //   getConfig.constants,
  //   getConfig.logger
  // );
  require("./common")(
    pubSubInstance,
    setupInstance,
    services,
    getConfig.constants,
    getConfig.env,
    getConfig.logger
  );
  return pubSubInstance; //PubSub;
};
