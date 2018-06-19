// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyCGj5rm6aPJc2tVxy4Zfx4DPGlCrnie3yI',
    authDomain: 'gps-demo-dc6d0.firebaseapp.com',
    databaseURL: 'https://gps-demo-dc6d0.firebaseio.com',
    projectId: 'gps-demo-dc6d0',
    storageBucket: 'gps-demo-dc6d0.appspot.com',
    messagingSenderId: '404025737458'
  }
};
