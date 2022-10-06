module.exports = function ConnectionFactory(schemaProvider, schemas, logger){
  const clientOptions = {
    autoIndex: true, // Don't build indexes 
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  async function connectdb(uri){
    try{
      const conn = await schemaProvider.createConnection(uri, clientOptions);
      conn.on("error", (error) => {
        logger.error(`Connection Error ${error}`);
      });

      conn.once("open", async () => {
        logger.info(`Client Database connected!! ${conn.name}`);
      });

      conn.model('TalentPool', schemas["talentPool"]);
      conn.model('JobEntry', schemas["jobEntry"]);
      conn.model('JobListing', schemas["jobListing"]);

      return conn;
    }catch(error){
      logger.error(`error: ${error}`)
    }
  }

  async function connectAdmindb(uri) {
    try{
        const conn = await schemaProvider.createConnection(uri, clientOptions);//.asPromise();
        conn.on("error", (error) => {
          logger.error(`Connection Error ${error} `,Object.keys(error));
        });
        conn.once("open", async () => {
          logger.info(`Admin Database connected!`);
        });
    
        conn.model('User', schemas["user"]);
        conn.model('Organization', schemas["organization"]);
        conn.model('OrgApiAccessToken', schemas["orgApiAccessToken"]);
        conn.model('OrgCounter', schemas["orgCounter"]);
        return conn; 
      }catch(error){
        logger.info(`error: ${error}`)
      }
    };

  function close(){
    schemaProvider.connection
      .close()
      .catch((err) => logger.error(`Connection error:`, err));
  };
  
  // When the connection is disconnected
  function disconnected(){
    schemaProvider.connection.on("disconnected", () => {
      console.log("Mongoose default connection disconnected");
      logger.error(`Disconnected error:`, err)
    });
  }

  return Object.freeze({
    connectdb,
    connectAdmindb,
    close,
    disconnected
  });
}