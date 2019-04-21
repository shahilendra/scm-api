# sequelizeJS-mssql
Connecting MSSQL with Sequelize JS

# Requirements
- Node JS & NPM http://nodejs.org/
- MS SQL Server https://www.microsoft.com/tr-tr/sql-server/sql-server-downloads
- Please make sure MS SQL Server TCP/IP connection is enabled and Server Browsing is up and runnig.

# Installation
- Clone or download the repository
- Open CMD / Terminal in the root directory of the project.
- Install dependencies via NPM by typing npm install

# Usage
- Create a database in MS SQL Server
- Open App.js in your favorite Text Editor
- Change the connection settings with your credentials and server instace.
- test is the database name
- sa is the SQL Server Username
- 123 is the SQL Server Password
- host is the ip adress of the SQL Server for example (127.0.0.1 or localhost)
- port is the standart port that MS SQL Server runs on
- dialect is the server type (mySQL, PostgreSQL) in this case we will be using mssql
- dialectOptions is the configuration for the database
- instanceName is the SQL Server name that you give before MS SQL Server installation. (Defaults SQLEXPRESS for MS SQL Express and MSSQLSERVER for MS SQL).

- To start the application please use Terminal on macOS / Linux or CMD / Powershell on Windows. Type node app.js

# Methods
- authenticate() is used to check the database connection
- define() is used to create a schema for the database model
- sync() is used to create the tables that defined with define()

- create() is used to insert a data on given Model
- findAll() is used to select all the rows in the table for given Model
- find() is used to select top one row in the given Model.

For more information please see the documentation.
http://docs.sequelizejs.com/manual/installation/getting-started.html
