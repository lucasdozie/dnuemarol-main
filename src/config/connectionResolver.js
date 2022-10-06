module.exports = function ConnectionResolver(cls, setupCon, logger){
    function resolveCustomer(req, res, next) {
        let tenant = req.headers["x-ims-customerid"] || req.headers.customer || "thriveAgricTest"; //req.headers.x-ims-customername
        tenant = tenant.toLowerCase();
        logger.info("tenant middleware... ",{tenant})
      
        if (!tenant) {
          throw new Error("Please provide organization's name to connect'");
        }
        let namespace = cls.getNamespace('tenants') || cls.createNamespace('tenants');
        let context = namespace.createContext();
        namespace.enter(context);
        try{
          namespace.set('connection', setupCon.getTenantConnection(tenant));
          namespace.set('customerId', tenant);
          return next();
        } catch (error) {
          next(error)
        }
    }

    function resolveAdmin(req, res, next) {
        let namespace = cls.getNamespace('tenants') || cls.createNamespace('tenants');
        let context = namespace.createContext();
        namespace.enter(context);
        try{
          namespace.set('connection', setupCon.getAdminConnection());
          logger.info("after connecting to admin")
          return next();
        } catch (error) {
          next(error)
        }
    }

    function getConnection() {
      const nameSpace = cls.getNamespace('tenants');
      const conn = nameSpace.get('connection');
    
      if (!conn) {
        throw new Error('Connection is not set for any tenant database.');
      }
    
      return conn;
  }

    return Object.freeze({ 
        resolveCustomer, 
        resolveAdmin,
        getConnection
    });
};