// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseApiURL: 'http://localhost:3000/api/',
	MQTT_SERVICE_OPTIONS: {
    hostname: 'localhost',
    port: 9001,
    path: '/mqtt'
  },
  organization: {
    currentYear: (new Date()).getFullYear(),
  	photoURL: 'http://localhost:3000/api/v1/resources/profile.jpeg',
    developerName: 'Paras Tripathi',
    companyName: 'Lakshmi Dairy',
    gitURL: '#',
    helpURL: '#'
  }
};
