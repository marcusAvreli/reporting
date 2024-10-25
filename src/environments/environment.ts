// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// the timeExpired is expressed in seconds. By default is set to 20 minutes

//import {AuthTypes} from '../app/core/factories/auth.type';
//import {ErrorHandlerTypes} from '../app/core/factories/error-handler.type';
//import {LoggerTypes} from '../app/core/factories/logger.type';
//import {AuthScheme} from '../app/core/models/auth-scheme.enum';
//


  /*      
POST http://192.168.243.143:8080/iiq/oauth2/generateToken 500 (Internal Server Error)


POST http://192.168.243.143:8080/iiq/oauth2/generateToken 500 (Internal Server Error)
*/
const server = 'http://192.168.243.143:8080/iiq';

export const environment = {
  production: false,
  authority: `${server}/oauth2`,
  root_api_url: `${server}`,
  user_api_url: `http://localhost:3000/users/`
};
