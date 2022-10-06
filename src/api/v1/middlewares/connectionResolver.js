//const { createNamespace } = require("continuation-local-storage");
const CLS = require("continuation-local-storage");
const {getTenantConnection, getAdminConnection } = require("./../../../service/dbConnection")

// Create a namespace for the application.
let nameSpace = CLS.createNamespace("tenants");
//console.log({createSpace: nameSpace})
/**
 * Get the connection instance for the given tenant's name and set it to the current context.
 */
const resolveTenant = (req, res, next) => {
  //const tenant = req.headers.tenant || "thriveAgric"; // or customerId / organizationId
  const tenant = req.headers.customer || "thriveAgric";

  console.log({tenant})

  if (!tenant) {
    return res
      .status(500)
      .json({ error: `Please provide organization's name to connect` });
  }
  nameSpace.run(() => {
    nameSpace.set("connection", getTenantConnection(tenant));
  });
  next();
};



function cls(req, res, next) {
  let tenant = req.headers["x-nuema-customerid"] || "thriveAgric";
  tenant = tenant.toLowerCase();
  console.log("tenant middleware... ",{tenant})

  if (!tenant) {
    throw new Error("Please provide organization's name to connect'");
  }
  let namespace = CLS.getNamespace('tenants') || CLS.createNamespace('tenants');
  let context = namespace.createContext();
  namespace.enter(context);
  try{
    namespace.set('connection', getTenantConnection(tenant));
   // namespace.set('customerId', tenant);
    console.log("appended connection... ")
    return next();
  } catch (error) {
    next(error)
  }
}


//app.use('/api/*', cls);


/**
 * Get the admin db connection instance and set it to the current context.
 */

 function setAdminDb(req, res, next) {
   console.log({keys: Object.keys(req)})
  let namespace = CLS.getNamespace('tenants') || CLS.createNamespace('tenants');
  let context = namespace.createContext();
  namespace.enter(context);
  try{
    namespace.set('connection', getAdminConnection());
    return next();
  } catch (error) {
    next(error)
  }
}

module.exports = { resolveTenant, setAdminDb, cls };