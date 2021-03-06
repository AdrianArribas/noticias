// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // ############### NEWSAPI API
  apikey: '2226a8606b174a9f91e18542709e1e64',
  apiUrl: 'https://newsapi.org/v2',

  // ############### MEDIASTACK API

  apikeyMS: 'access_key=ce63f540bc1d47ec44959df589612b8e',
  apiUrlMS: 'http://api.mediastack.com/v1/news?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
