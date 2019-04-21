import { environment } from '../../environments/environment'; 
export const config = {
	baseApiURL: environment.baseApiURL,
	MQTT_SERVICE_OPTIONS: environment.MQTT_SERVICE_OPTIONS,
  organization: environment.organization,
  gameImages: [
    {
      name: 'Racing Games',
      imageURL: 'assets/images/tg1.jpg'
    },
    {
      name: '3D Games',
      imageURL: 'assets/images/tg2.jpg'
    },
    {
      name: 'Action Games',
      imageURL: 'assets/images/tg3.jpg'
    },
    {
      name: 'Toy Games',
      imageURL: 'assets/images/tg4.jpg'
    },
    {
      imageURL: 'assets/images/ng1.jpg',
      name: 'Game 1'
    },
    {
      imageURL: 'assets/images/ng2.jpg',
      name: 'Game 2'
    },
    {
      imageURL: 'assets/images/ng3.jpg',
      name: 'Game 3'
    },
    {
      imageURL: 'assets/images/ng4.jpg',
      name: 'Game 4'
    },
    {
      imageURL: 'assets/images/ng5.jpg',
      name: 'Game 5'
    },
    {
      imageURL: 'assets/images/ng6.jpg',
      name: 'Game 6'
    },
    {
      imageURL: 'assets/images/ng7.jpg',
      name: 'Game 7'
    },
    {
      imageURL: 'assets/images/ng8.jpg',
      name: 'Game 8'
    }
  ],
  genders: ['Male', 'Female', 'Others'],
  userRoles: ['Director','Instructor', 'Player', 'DBA'],
  retrievedSuccess: 'retrieved successfully',
  retrievedError: 'retrieved failed',
  addedSuccess: 'inserted successfully',
  additionError: 'insertion failed',
  updatedSuccess: 'updated successfully',
  updationError: 'updation failed',
  deletedSuccess: 'deleted successfully',
  deletionError: 'deletion failed',
  pageLength: 5,
  pageSize: 10,
  pageSizeOptions: [25, 50, 100]

}

