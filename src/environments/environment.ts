// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    coronaApi: 'https://covid-api.mmediagroup.fr/v1',
    auth0Config: {
        domain: 'dev-jl0dzt91.us.auth0.com',
        clientId: 'eFTQkAXbn34WNxbvr407jFIHcl08Aarf',
        redirectUri: document.location.origin
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
