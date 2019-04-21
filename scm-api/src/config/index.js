module.exports = {
  port: 3000,
  secret: 'supersecret',
  expiresIn: 86400, // expires in 24 hours,
  isConsoleLog: false,
  isTestSetup: true,
  publicRooTURL: 'http://localhost:4200/',
  userRoles: ['Director','Instructor', 'Player', 'DBA'],
  sqlConfig: {
    database: 'crctt',
    user: 'sa',
    password: 'Chetu@123',
    host: '127.0.0.1',
    dialect: 'mssql',
    port: 1433
  }
};