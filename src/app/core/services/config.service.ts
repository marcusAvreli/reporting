import { Injectable } from "@angular/core";
import { IHttpConfig } from "../models/http-config.interface";
import { InterceptorUrls } from "../models/interceptor-urls.model";
import { AuthConfig } from "../models/auth-config.model";
import { HttpClient } from "@angular/common/http";



import { Observable, Subject,  pipe, of,tap, from, interval, merge, fromEvent } from 'rxjs';

import { CustomHeaders } from "../models/custom-headers.model";

@Injectable()
export class ConfigService implements IHttpConfig {
  public interceptUrls!: InterceptorUrls;
  public authConfig: AuthConfig;
  //correct init string
  public propertiesFile!: string;
  public meta: any = {};
  public appId: string = '';

  constructor(private http: HttpClient) {
  }

  /**
   * Loads the application properties via config service or other.
   * @param {IHttpConfig} config
   * @returns {Observable<any>}
   */
  public load(config: IHttpConfig): Observable<any> {
  console.log("load:"+JSON.stringify(config));
    if (config) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      });
    } else if (!config) {
      config = {propertiesFile: '/properties.json'};
    }
    if (config && config.propertiesFile) {
	console.log("hello");
      return this.http.get(config.propertiesFile)
        .pipe(tap(res => {
          Object.keys(res)
            .forEach(key => {
              this[key] = res[key];
            });
        }));
    } else {

      return of({});
    }
  }

  /**
   * Sets custom headers for http interception
   * @param {string} interceptorUrl
   * @param {CustomHeaders} headers
   */
  public setInterceptorHeaders(interceptorUrl: string, headers: CustomHeaders): void {
  if(this.interceptUrls){
    const configGroup = this.interceptUrls[interceptorUrl];
   // configGroup.headers = configGroup.headers || {};
	
    Object.keys(headers).forEach(key => {
	if(configGroup && configGroup.headers){
      configGroup.headers[key] = headers[key];
	  }
    });
	
  }}
}