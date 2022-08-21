//const { createNamespace } = require("continuation-local-storage");
const CLS = require("continuation-local-storage");
<<<<<<< HEAD
const {getTenantConnection, getAdminConnection } = require("./../../../service/dbConnection")

// Create a namespace for the application.
let nameSpace = CLS.createNamespace("tenants");
//console.log({createSpace: nameSpace})
=======
const {getTenantConnection, getAdminConnection } = require("./../services/dbConnection")

// Create a namespace for the application.
let nameSpace = CLS.createNamespace("tenants");
console.log({createSpace: nameSpace})
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
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
<<<<<<< HEAD
=======
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
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
};



function cls(req, res, next) {
<<<<<<< HEAD
  let tenant = req.headers["x-nuema-customerid"] || req.headers.customer || "thriveAgric"; //req.headers.x-nuema-customername
  tenant = tenant.toLowerCase();
  console.log("tenant middleware... ",{tenant})

  if (!tenant) {
    throw new Error("Please provide organization's name to connect'");
=======
  const tenant = req.headers.customer || "thriveAgric";

  console.log({tenant})

  if (!tenant) {
    return res
      .status(500)
      .json({ error: `Please provide organization's name to connect` });
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
  }
  let namespace = CLS.getNamespace('tenants') || CLS.createNamespace('tenants');
  let context = namespace.createContext();
  namespace.enter(context);
  try{
    namespace.set('connection', getTenantConnection(tenant));
    namespace.set('customerId', tenant);
<<<<<<< HEAD
    console.log("appended connection... ")
    return next();
  } catch (error) {
    next(error)
=======
    return next();
  } catch (e) {
    console.log('CLS ERR: ' + e);
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
  }
}


//app.use('/api/*', cls);


/**
 * Get the admin db connection instance and set it to the current context.
 */
<<<<<<< HEAD

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

const setAdminDbAlt = (req, res, next) => {
  console.log("setting adminDbConnection .......")
=======
const setAdminDb = (req, res, next) => {
  console.log("setAdminDb adminDbConnection .......")
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection();
    console.log("setAdminDb adminDbConnection", adminDbConnection.name);
    nameSpace.set("connection", getAdminConnection());
<<<<<<< HEAD
=======

    console.log({adminactive: nameSpace.active})
>>>>>>> 7dd33ca3da84820c98ebd20bfc581fbdaa44ab2c
    next();
  });
};

module.exports = { resolveTenant, setAdminDb, cls };