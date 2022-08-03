//const { createNamespace } = require("continuation-local-storage");
const CLS = require("continuation-local-storage");
const {getTenantConnection, getAdminConnection } = require("./../services/dbConnection")

// Create a namespace for the application.
let nameSpace = CLS.createNamespace("tenants");
console.log({createSpace: nameSpace})
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
  // const userInfo ={name: "josh", age: 36, email: "josh@gmail.com", gender: "male"}
  // // Run the application in the defined namespace. It will contextualize every underlying function calls.
  // console.log("Before Set nameSpace for connection........: ")
  // nameSpace.run(() => {
  //   const userOccupation ={company: "Tesla", founded: 1970, email: "josh@tesla.com", gender: "male"}
  //   const tenantDbConnection = getTenantConnection(tenant);
  //   console.log(
  //     "resolveTenant tenantDbConnection",
  //     tenantDbConnection && tenantDbConnection.name
  //   );

    
  //   if(!tenantDbConnection.name) throw new Error("Organization not found.");
  //   console.log("Set nameSpace for connection........: ")
  //   console.log({keys: Object.keys(tenantDbConnection)})
  //   nameSpace.set("connection", getTenantConnection(tenant));

  //   console.log({active: nameSpace.active})
  //   //console.log({nameSpace, spacekeys: Object.keys(nameSpace), active: nameSpace.active});
    
  //   //Alternative - connection object
  //   req.connDb = nameSpace.active

  //   //Alternative - connection object
  //   req.organization = tenant
    
  //   next();
  // });
};



function cls(req, res, next) {
  const tenant = req.headers.customer || "thriveAgric";

  console.log({tenant})

  if (!tenant) {
    return res
      .status(500)
      .json({ error: `Please provide organization's name to connect` });
  }
  let namespace = CLS.getNamespace('tenants') || CLS.createNamespace('tenants');
  let context = namespace.createContext();
  namespace.enter(context);
  try{
    namespace.set('connection', getTenantConnection(tenant));
    namespace.set('customerId', tenant);
    return next();
  } catch (e) {
    console.log('CLS ERR: ' + e);
  }
}


//app.use('/api/*', cls);


/**
 * Get the admin db connection instance and set it to the current context.
 */
const setAdminDb = (req, res, next) => {
  console.log("setAdminDb adminDbConnection .......")
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection();
    console.log("setAdminDb adminDbConnection", adminDbConnection.name);
    nameSpace.set("connection", getAdminConnection());

    console.log({adminactive: nameSpace.active})
    next();
  });
};

module.exports = { resolveTenant, setAdminDb, cls };