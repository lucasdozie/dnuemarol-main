const { getNamespace } = require('continuation-local-storage')

module.exports = function getConnection() {
    const nameSpace = getNamespace('tenants');
    const conn = nameSpace.get('connection');
  
    if (!conn) {
      throw new Error('Connection is not set for any tenant database.');
    }
  
    return conn;
}