export const environment = {
  production: true,
  baseApiURL: 'http://35.190.170.3/api/',
	MQTT_SERVICE_OPTIONS: {
    hostname: '35.190.170.3',
    port: 9001,
    path: '/mqtt'
  },
  organization: {
    currentYear: (new Date()).getFullYear(),
  	photoURL: 'http://35.190.170.3/api/v1/resources/profile.jpeg',
    developerName: 'Paras Tripathi',
    companyName: 'Lakshmi Dairy',
    gitURL: '#',
    helpURL: '#'
  }
};
