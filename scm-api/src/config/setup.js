const models = require("../models");
const bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync('test123', 8);
const userFullName = 'Shailendra Tiwari';

let user1 = {
    email: "test@gmail.com",
    firstName: "Shailendra",
    lastName: "Tiwari",
    phone: "97186999999",
    gender: 'Male',
    roleId: 1,
    activationCode: 'test2',
    isActivated: true,
    password: hashedPassword,
    details: `{
      address1: 'Test',
      address2: 'Test'
    }`
};

let role1 = {
  name: 'DBA',
  descriptions: 'DBA User Roles',
  isActive: true,
  createdBy: userFullName,
  updatedBy: userFullName
};

let organisation1 = {
  name: 'Test Organisation',
  descriptions: 'Test Organisation',
  isActive: true,
  details: `{
    address1: 'Test',
    address2: 'Test'
  }`,
  createdBy: userFullName,
  updatedBy: userFullName
};

let organisationsUsers1 = {
  userId: 1,
  organisationId: 1,
  isActive: true,
  createdBy: userFullName,
  updatedBy: userFullName
};

const dropTestDbs = () => {
  return Promise.all([
    models.roles.sync(),
    models.users.sync(),
    models.images.sync(),
    models.menus.sync(),
    models.organisations.sync(),
    models.organisationsUsers.sync(),
    models.analytics.sync(),
    models.menusPermissions.sync(),
    models.supportQuery.sync()
  ]);
};

dropTestDbs()
  .then((result) => { 
    console.log('Synch all models with dbs : ');
    return models.roles.findOrCreate({where: {name: role1.name}, defaults: role1});
  })
  .then((result) => {
    console.log('Synch role with dbs : ');
    return models.users.findOrCreate({where: {email: user1.email}, defaults: user1});
  })
  .then((result) => {
    console.log('Synch all user with dbs : ');
    return models.organisations.findOrCreate({where: {name: organisation1.name}, defaults: organisation1});
  })
  .then((result) => {
    console.log('Synch all organisation with dbs : ');
    return models.organisationsUsers.findOrCreate({
      where: {
        userId: organisationsUsers1.userId,
        organisationId: organisationsUsers1.organisationId,
        isActive: true,
      }, 
      defaults: organisationsUsers1
    });
  })
  .then((result) => {
    console.log('Synch all organisationsUsers with dbs : ');
  })
  .catch((err) => {
   console.log(err);
  });