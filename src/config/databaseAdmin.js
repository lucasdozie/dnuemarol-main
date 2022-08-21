const mongoose = require('mongoose');
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
};

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
  close,
  disconnected
}
module.exports = async function connectionFactoryAdmin(URI) {
    try{
        const conn = await mongoose.createConnection(URI, clientOptions);//.asPromise();
        conn.on("error", (error) => {
          logger.error(`Connection Error ${error} `,Object.keys(error));
        });
        conn.once("open", async () => {
          logger.info(`Admin Database connected!`);
        });
    
        // conn.model('Payroll', require('./../api/v1/models/schema/payroll'));
        // conn.model('Recruitment', require('./../api/v1/models/schema/recruitment'));
        
        return conn; 
      }catch(error){
        logger.info(`error: ${error}`)
      }
};