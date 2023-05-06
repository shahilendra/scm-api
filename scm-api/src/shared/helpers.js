const fs = require('fs');
const bcrypt = require('bcryptjs');
const config = require('../config');
const randomString = require('random-string');

exports.finalResponse = function(status, data, response) {
  let statusMap = status? status: 500;
  let dataMap = (data? (data.status && statusMap != 200? data.data : data): 'Error on the server.');
  if(config.isConsoleLog && statusMap == 500) {
    console.log('response status : ', statusMap);
    console.log('response data : ', dataMap);
  }
  return response.status(statusMap).send(dataMap);
};

exports.finalError = function(status, error) {
  if(config.isConsoleLog) {
    console.log('error status : ', status);
    console.log('error data : ', error);
  }
  
  return Promise.reject({status: status, data: error});
};

exports.getPromise = function(data) {
  return Promise.resolve(data);
};

exports.getRendomeString = function() {
  let rendonStr = randomString({
    length: 8,
    numeric: true,
    letters: true,
    special: false,
    exclude: ['a', 'b', '1']
  });
  return rendonStr;
}


exports.updateUser = function(user, body) {
  var hashedPassword;
  let user1 = {};
  if(body.password){
    hashedPassword = bcrypt.hashSync(body.password, 8);
    user1.password = hashedPassword? hashedPassword: user.password;
  }
  if(user == null) {
    return Promise.reject('User id is not be empty. So please enter valid user id!');
  } else if(body.email) {
    if(!user.email) {
      user1.email = body.email;
      user1.isActivated =  user.activationCode? user.isActivated: false;
      user1.activationCode =  exports.getRendomeString();
    }
    user1.firstName = body.firstName;
    user1.lastName = body.lastName;
    user1.phone = body.phone;
    user1.age = body.age;
    user1.gender = body.gender;
    user1.roleId = body.roleId;
    user1.details = body.details;
    return Promise.resolve(user1);
  } else {
    return Promise.reject('Emails Should not be empty. So please enter valid email id of the user!');
  }
};

module.exports.mapImageMetaData = function (image, imageData, userId) {
  if(imageData) {
    image.fieldName = imageData.fieldname;
    image.originalName = imageData.originalname;
    image.encoding = imageData.encoding;
    image.mimeType = imageData.mimetype;
    image.destination = imageData.destination;
    image.fileName = imageData.filename;
    image.path = imageData.path;
    image.size =  imageData.size;
    image.imageURL =  '/api/v1/resources/' + imageData.filename;
    image.userId = userId;
    return Promise.resolve(image);
  } else {
     return Promise.reject('Image is not uploaded succesfully!');
  }
};

module.exports.deleteFileFromDirectory = function (image, prevousImagepath) {
  var q = new Promise(function(resolve, reject) {
    return fs.unlink(prevousImagepath , function (err) {
      return resolve(image);
    });
  });
  return q.then(function() {
    return image;
  }, function(e) {   
    return image;
  });
};

exports.getUserProfile = function(user) {
  if(user) {
   let userMap = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      roleId: user.roleId,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      isActive: user.isActive,
      details: user.details
    };
    return Promise.resolve(userMap);
  } else {
    return Promise.reject('Emails Should not be empty. So please enter valid email id of the user!');
  }
};

exports.updateSupportQuery = function(supportQuery, body, createdBy) {
  if( supportQuery == null) {
    return Promise.reject('supportQuery id is not be empty. So please enter valid supportQuery id!');
  } else if(body.name) {
    let mapQuery = {};
    if(supportQuery.createdBy) {
      mapQuery.updatedBy = createdBy;
    } else {
      mapQuery.createdBy = createdBy;
    }
    mapQuery.name = body.name;
    mapQuery.email = body.email;
    mapQuery.phone = body.phone;
    mapQuery.status = body.status? body.status: 'Requested';
    mapQuery.city = body.city;
    mapQuery.userId = body.userId;
    mapQuery.parantMessageId = body.parantMessageId;
    mapQuery.message = body.message;
    mapQuery.organisationId = body.organisationId;
    return Promise.resolve(mapQuery);
  } else {
    return Promise.reject('supportQuery name should not be empty. So please enter valid supportQuery name!');
  }
};

exports.updateOrganisation = function(organisation, body, createdBy) {
  if( organisation == null) {
    return Promise.reject('Organisation id is not be empty. So please enter valid Organisation id!');
  } else if(body.name) {
    let organisation1 = {};
    if(organisation.id) {
      organisation1.updatedBy = createdBy;
    } else {
      organisation1.createdBy = createdBy;
    }
    organisation1.name = body.name;
    organisation1.descriptions = body.descriptions;
    organisation1.isActive = body.isActive;
    organisation1.details = body.details;
    return Promise.resolve(organisation1);
  } else {
    return Promise.reject('Organisation name should not be empty. So please enter valid Organisation name!');
  }
};

exports.updateRole = function(role, body, createdBy) {
  if(role == null) {
    return Promise.reject('Role id is not be empty. So please enter valid Role id!');
  } else if(body.name) {
    let roleMap = {};
    if(role.id) {
      roleMap.updatedBy = createdBy;
    } else {
      roleMap.createdBy = createdBy;
    }
    roleMap.name = body.name;
    roleMap.descriptions = body.descriptions;
    roleMap.isActive = body.isActive;
    return Promise.resolve(roleMap);
  } else {
    return Promise.reject('Role name should not be empty. So please enter valid Role name!');
  }
};

exports.updateCalvingType = function(calvingType, body, createdBy) {
  if(calvingType == null) {
    return Promise.reject('calvingType id is not be empty. So please enter valid calvingType id!');
  } else if(body.name) {
    let calvingTypeMap = {};
    if(calvingType.id) {
      calvingTypeMap.updatedBy = createdBy;
    } else {
      calvingTypeMap.createdBy = createdBy;
    }
    calvingTypeMap.name = body.name;
    calvingTypeMap.isActive = body.isActive;
    calvingTypeMap.organisationId = body.organisationId;
    return Promise.resolve(calvingTypeMap);
  } else {
    return Promise.reject('calvingType name should not be empty. So please enter valid calvingType name!');
  }
};

exports.updateBreed = function(breed, body, createdBy) {
  if(breed == null) {
    return Promise.reject('Breed id is not be empty. So please enter valid breed id!');
  } else if(body.name) {
    let breedMap = {};
    if(breed.id) {
      breedMap.updatedBy = createdBy;
    } else {
      breedMap.createdBy = createdBy;
    }
    breedMap.name = body.name;
    breedMap.isActive = body.isActive;
    breedMap.organisationId = body.organisationId;
    return Promise.resolve(breedMap);
  } else {
    return Promise.reject('Breed name should not be empty. So please enter valid breed name!');
  }
};

exports.updateColor = function(color, body, createdBy) {
  if(color == null) {
    return Promise.reject('Color id is not be empty. So please enter valid color id!');
  } else if(body.name) {
    let colorMap = {};
    if(color.id) {
      colorMap.updatedBy = createdBy;
    } else {
      colorMap.createdBy = createdBy;
    }
    colorMap.name = body.name;
    colorMap.isActive = body.isActive;
    colorMap.organisationId = body.organisationId;
    return Promise.resolve(colorMap);
  } else {
    return Promise.reject('Color name should not be empty. So please enter valid Color name!');
  }
};
exports.updateNote = function(note, body, createdBy, animalId) {
  if(note == null) {
    return Promise.reject('Note id is not be empty. So please enter valid Note id!');
  } else if(body.massage) {
    let map = {};
    if(note.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    let date_ob = new Date();    
    let time = date_ob.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    map.massage = body.massage;
    map.date = body.date;
    map.time = time;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Note message should not be empty. So please enter valid Note message!');
  }
};

// exports.updateWeightList = function(entities) {
//   var maps = [];
//   for(var index =0; index< entities.length; index++) {
//     if(entities[index]){
//       entities[index].time = entities[index].time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
//       console.log('Time: ', entities[index].time);
//     }
//   }
//   return Promise.resolve(entities);
// };

exports.updateAnimalBodyScore = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('Score id is not be empty. So please enter valid Score id!');
  } else if(body.score) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.score = body.score;
    map.date = body.date;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Body score should not be empty. So please enter valid Body score!');
  }
};

exports.updateLactation = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('Lactation id is not be empty. So please enter valid Lactation id!');
  } else if(body.lactationNo) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.endDate = body.endDate;
    map.startDate = body.startDate;
    map.lactationNo = body.lactationNo;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Lactation score should not be empty. So please enter valid Lactation score!');
  }
};

exports.updateAnimalLocation = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('Location id is not be empty. So please enter valid Location id!');
  } else if(body.locationId) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.endDate = body.endDate;
    map.startDate = body.startDate;
    map.locationId = body.locationId;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Location id should not be empty. So please enter valid Location id!');
  }
};

exports.updateAnimalGruop = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('Group id is not be empty. So please enter valid Group id!');
  } else if(body.groupId) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.groupId = body.groupId;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Group id should not be empty. So please enter valid Group id!');
  }
};

exports.updateAnimalMilkYield = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('milkYield id is not be empty. So please enter valid milkYield id!');
  } else if(body.milkYield) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.date = body.date;
    map.time = body.time;
    map.milkYield = body.milkYield;
    map.milkingTime = body.milkingTime;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('milkYield id should not be empty. So please enter valid milkYield id!');
  }
};

exports.updateAnimalWeight = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('weight id is not be empty. So please enter valid weight id!');
  } else if(body.weight) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.date = body.date;
    map.weight = body.weight;
    map.time = body.time;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('weight id should not be empty. So please enter valid weight id!');
  }
};

exports.updateInsemination = function(data, body, createdBy, animalId) {
  if(data == null) {
    return Promise.reject('Insemination id is not be empty. So please enter valid insemination id!');
  } else if(body.date) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
      map.status = "Uncertain"
    }
    map.notes = body.notes;
    map.date = body.date;
    map.time = body.time;
    map.examinationDate = body.examinationDate;
    map.price = body.price;
    map.staff = body.staff;
    map.methodId = body.methodId;
    map.detectionTypeId = body.detectionTypeId;
    map.bullEarTag = body.bullEarTag;
    map.spermaNo = body.spermaNo;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Insemination message should not be empty. So please enter valid Insemination message!');
  }
};
exports.updateTransaction = function(transaction, body, createdBy, animalId) {
  if(transaction == null) {
    return Promise.reject('Transaction id is not be empty. So please enter valid Transaction id!');
  } else if(body.massage) {
    let map = {};
    if(transaction.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    let date_ob = new Date();
    let time = date_ob.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    map.massage = body.massage;
    map.date = body.date;
    map.time = time;
    map.isActive = body.isActive;
    map.animalId = animalId;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Transaction message should not be empty. So please enter valid Transaction message!');
  }
};
exports.updateCalvingOperator = function(calvingOperator, body, createdBy) {
  if(calvingOperator == null) {
    return Promise.reject('calvingOperator id is not be empty. So please enter valid calvingOperator id!');
  } else if(body.name) {
    let calvingOperatorMap = {};
    if(calvingOperator.id) {
      calvingOperatorMap.updatedBy = createdBy;
    } else {
      calvingOperatorMap.createdBy = createdBy;
    }
    calvingOperatorMap.name = body.name;
    calvingOperatorMap.phone = body.phone;
    calvingOperatorMap.notes = body.notes;
    calvingOperatorMap.isActive = body.isActive;
    calvingOperatorMap.organisationId = body.organisationId;
    return Promise.resolve(calvingOperatorMap);
  } else {
    return Promise.reject('calvingOperator name should not be empty. So please enter valid calvingOperator name!');
  }
};

exports.updateSemen = function(semen, body, createdBy) {
  if(semen == null) {
    return Promise.reject('Semen id is not be empty. So please enter valid semen id!');
  } else if(body.name) {
    let map = {};
    if(semen.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.name = body.name;
    map.semenNo = body.semenNo;
    map.breedId = body.breedId;
    map.notes = body.notes;
    map.isActive = body.isActive;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject('Semen name should not be empty. So please enter valid semen name!');
  }
};

exports.updateAnimal = function(data, body, createdBy) {
  if(data == null) {
    return Promise.reject({messge:'Animal id is not be empty. So please enter valid Animal id!'});
  } else if(body.name) {
    let map = {};
    if(data.id) {
      map.updatedBy = createdBy;
    } else {
      map.createdBy = createdBy;
    }
    map.name = body.name;
    map.earTag = body.earTag;
    map.transponderId = body.transponderId;
    map.gender = body.gender;
    map.groupId = body.groupId;
    map.insurance = body.insurance;
    map.breedId = body.breedId;
    map.colorId = body.colorId;
    map.notes = body.notes;
    map.birthDate = body.birthDate;
    map.birthWeight = body.birthWeight;
    map.horn = body.horn;
    map.blindQuarterCount = body.blindQuarterCount;
    map.damEarTag = body.damEarTag;
    map.sireRegisterId = body.sireRegisterId;
    map.purchasePrice = body.purchasePrice;
    map.purchaseDate = body.purchaseDate;
    map.purchaseBodyWeight = body.purchaseBodyWeight;
    map.calvingTypeId = body.calvingTypeId;
    map.calvingOperatorId = body.calvingOperatorId;
    map.occurrenceId = body.occurrenceId;
    map.locationId = body.locationId;
    map.origin = body.origin;
    map.statusDate = body.statusDate;
    map.statusId = body.statusId;
    map.siblingsTypeId = body.siblingsTypeId;
    map.isTwin = body.isTwin;
    map.twinEarTag = body.twinEarTag;
    map.isSlaughterhouse = body.isSlaughterhouse;
    map.lactationId = body.lactationId;
    map.isActive = body.isActive;
    map.organisationId = body.organisationId;
    return Promise.resolve(map);
  } else {
    return Promise.reject( { message:'Animal name should not be empty. So please enter valid Animal name!'});
  }
};

exports.updateMenu = function(item, body, createdBy) {
  if(item == null) {
    return Promise.reject('Menu id is not be empty. So please enter valid Menu id!');
  } else  if(body.title) {
    let dataMap = {};
    if(item.id) {
      dataMap.updatedBy = createdBy;
    } else {
      dataMap.createdBy = createdBy;
    }
    dataMap.title = body.title;
    dataMap.menuId = body.menuId;
    dataMap.type = body.type;
    dataMap.icon = body.icon;
    dataMap.url = body.url;
    dataMap.parentId = body.parentId == 0? null: body.parentId;
    dataMap.displayOrder = (body.displayOrder == 0 || body.displayOrder == null)? 1: body.displayOrder;
    dataMap.isActive = body.isActive;
    return Promise.resolve(dataMap);
  } else {
    return Promise.reject('Menu name should not be empty. So please enter valid Menu name!');
  }
};


exports.updateMenusPermission = function(item, body, createdBy) {
  if(item == null) {
    return Promise.reject('MenusPermission id is not be empty. So please enter valid MenusPermission id!');
  } else  if(body.menuId) {
    let dataMap = {};
    if(item.id) {
      dataMap.updatedBy = createdBy;
    } else {
      dataMap.createdBy = createdBy;
    }
    dataMap.menuId = body.menuId;
    dataMap.roleId = body.roleId;
    dataMap.canView = body.canView;
    dataMap.canAdd = body.canAdd;
    dataMap.canEdit = body.canEdit;
    dataMap.canDelete = body.canDelete;
    dataMap.organisationId = body.organisationId;
    dataMap.isActive = body.isActive;
    return Promise.resolve(dataMap);
  } else {
    return Promise.reject('MenusPermission  name should not be empty. So please enter valid MenusPermission  name!');
  }
};


exports.updateOrganisationsUser = function(item, body, createdBy) {
  if(item == null) {
    return Promise.reject('OrganisationsUser id is not be empty. So please enter valid OrganisationsUser id!');
  } else  if(body.userId) {
    let dataMap = {};
    if(item.id) {
      dataMap.updatedBy = createdBy;
    } else {
      dataMap.createdBy = createdBy;
    }
    dataMap.userId = body.userId;
    dataMap.organisationId = body.organisationId;
    dataMap.isActive = body.isActive;
    return Promise.resolve(dataMap);
  } else {
    return Promise.reject('OrganisationsUser name should not be empty. So please enter valid OrganisationsUser name!');
  }
};

exports.getOtp = function() {
  return Math.floor(1000 + Math.random() * 9000);
};

exports.InOtpVerifyed  = function(item, body, createdBy) {
  if(item == null) {
    return Promise.reject('Your booking id is not valid please enter valid booking id');
  } else if(body.inOtp!=null && item.inOtp == body.inOtp && !item.isInOtpVerifyed) {
    dataMap = {
      checkInDate: new Date(),
      isInOtpVerifyed: true,
      inVerifyedBy: createdBy,
      outOtp: exports.getOtp()
    };
    return Promise.resolve(dataMap);
  } else {
    return Promise.reject('Your booking inOtp is not valid please enter valid booking inOtp');
  }
}

exports.outOtpVerifyed  = function(item, body, createdBy) {
  if(item == null) {
    return Promise.reject('Your booking id is not valid please enter valid booking id');
  } else if(body.outOtp!=null && item.outOtp == body.outOtp && !item.isOutOtpVerifyed) {
    dataMap = {
      checkOutDate: new Date(),
      isOutOtpVerifyed: true,
      outVerifyedBy: createdBy
    };
    return Promise.resolve(dataMap);
  } else {
    return Promise.reject('Your booking outOtp is not valid please enter valid booking outOtp');
  }
}

function convertChildren(parentId, array) {
  try {
    //console.log('===================3');
    let children = []; 
    array.forEach((item)=> {
      if(parentId == item.parentId) {
        let child = convertChildren(item.id, array);
        // console.log('===================111');
        children.push({
          title: item.title,
          menuId: item.menuId,
          parentId: item.parentId,
          type: item.type,
          icon: item.icon,
          url: item.url,
          displayOrder: (item.displayOrder == 0 || item.displayOrder == null)? 1: item.displayOrder,
          isActive: item.isActive,
          children: child
        });
      }
    });
    // console.log('===================4', parentId, children);
    return children;
  } catch(ex) {
    return Promise.reject(ex);
  }
}

exports.convert = function(array) {
  try {
    let parents = []; 
    // console.log('===================1');
    array.forEach((item)=> {
      if(!item.parentId) {
        let child = convertChildren(item.id, array);
        // console.log('===================111');
        parents.push({
          title: item.title,
          menuId: item.menuId,
          parentId: item.parentId,
          type: item.type,
          icon: item.icon,
          url: item.url,
          displayOrder: (item.displayOrder == 0 || item.displayOrder == null)? 1: item.displayOrder,
          isActive: item.isActive,
          children: child
        });
      }
    });
    // console.log('=================2', parents);
    return Promise.resolve(parents);
  } catch(ex) {
    return Promise.reject(ex);
  }
}
