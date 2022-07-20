const ACTIONS_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
};

const EVENTS = {
    DEVICE: {
      NEW: 'device.new',
      CREATE: 'device.create',
      UPDATE: 'device.update',
      DELETE: 'device.delete',
      ADD_FEATURE: 'device.add-feature',
      ADD_PARAM: 'device.add-param',
      NEW_STATE: 'device.new-state',
      PURGE_STATES: 'device.purge-states',
      CALCULATE_HOURLY_AGGREGATE: 'device.calculate-hourly-aggregate',
    },
    MESSAGE: {
      NEW: 'message.new',
    },
    SYSTEM: {
      DOWNLOAD_UPGRADE: 'system.download-upgrade',
      CHECK_UPGRADE: 'system.check-upgrade',
      TIMEZONE_CHANGED: 'system.timezone-changed',
    },
    WEBSOCKET: {
      SEND: 'websocket.send',
      SEND_ALL: 'websocket.send-all',
    },
    USER: {
      SIGNUP: 'user.signup',
      LOGIN: 'user.login',
    },
    JOB: {
      PURGE_OLD_JOBS: 'job.purge-old-jobs',
    },
};

//module.exports.ACTIONS_STATUS = ACTIONS_STATUS;
module.exports = {
    ACTIONS_STATUS,
    EVENTS
}