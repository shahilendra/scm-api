module.exports = {
  port: 3000,
  secret: 'supersecret',
  expiresIn: 86400, // expires in 24 hours,
  isConsoleLog: true,
  isTestSetup: true,
  publicRooTURL: 'http://localhost:4200/',
  userRoles: ['Director','Instructor', 'Player', 'DBA'],
  sqlConfig: {
    database: 'crctt_new',
    user: 'sa',
    password: 'sa@123',
    host: '192.168.0.104',
    dialect: 'mssql',
    port: 59298, //1433,
    encrypt: false,
    pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 30000
    }
  }
};