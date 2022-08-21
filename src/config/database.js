const mongoose = require('mongoose');
const { MONGO_DB, MONGO_PASSWORD, MONGO_USER, URI } = require("./env");
//const {} = require("")
import logger from "./logger";

const clientOptions = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6

  //  socketTimeoutMS: 30000,
    keepAlive: true,
  //  poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  //  useFindAndModify: false,
  //  useCreateIndex: true
};

function connectionFactoryII(URI) {
  return new Promise(async (resolve, reject) => {
    const conn = await mongoose.createConnection(URI, clientOptions);//.asPromise();
    resolve(conn);
  })
}

function close(){
  mongoose.connection
    .close()
    .catch((err) => logger.error(`Connection error:`, err));
};

// When the connection is disconnected
function disconnected(){
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
    logger.error(`Disconnected error:`, err)
  });
}

module.exports = {
  connectionFactoryII,
  close,
  disconnected
}
module.exports = async function connectionFactory(URI) {
  try{
    const conn = await mongoose.createConnection(URI, clientOptions);

    conn.on("error", (error) => {
      logger.error(`Connection Error ${error}`);
    });
    conn.once("open", async () => {
      //console.log("connectionFactory client MongoDB Connection ok! ");
      logger.info(`Client Database connected!! ${conn.name}`);
    });

    conn.model('Payroll', require('./../api/v1/models/schema/payroll'));
    conn.model('Recruitment', require('./../api/v1/models/schema/recruitment'));
 
    return conn; 
  }catch(error){
    logger.error(`error: ${error}`)
  }
};