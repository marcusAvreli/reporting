import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OAuth2Service } from "../services/oauth2.service";
import { Observable } from "rxjs";
import { CustomHeaders } from "../models/custom-headers.model";
import { ConfigService } from "../services/config.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: OAuth2Service, private httpConfig: ConfigService) {}

  /**
   * Intercepts all http requests to add authorization headers and replace url placeholders
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const setHeaders = {};
    const url = this.discoverUrlReplacement(req, setHeaders);
    const authReq = req.clone({
      url,
      setHeaders
    });

    return next.handle(authReq);
  }

  /**
   * Replace url placeholders (i.e. "apiurl://endpoint" -> "http://myapi/endpoint")
   */
  private discoverUrlReplacement(req: HttpRequest<any>, headers: any): string {
  
    let refactoredUrl = req.url;
	if(headers && this.httpConfig){
   for (const key in this.httpConfig.interceptUrls) {
      if (req.url.startsWith(key)) {
        refactoredUrl = req.url.replace(key, this.httpConfig.interceptUrls[key].root);
        if (this.httpConfig.interceptUrls[key].isAuth) this.setAuthorizationHeader(headers);
        if (this.httpConfig.interceptUrls[key].headers){
			if(this.httpConfig?.interceptUrls[key]?.headers){
			this.runCustomHeaders(headers, this.httpConfig.interceptUrls[key].headers);
			}
		}
      }
    }

}
    return refactoredUrl;
  }

  /**
   * Adds the authorization header
   */
  private setAuthorizationHeader(headers: any): any {
    headers['x-access-token'] = "sadsads";
  }

  /**
   * Adds the language header
   */
  private runCustomHeaders(headers, customHeaders?: CustomHeaders): any {
  if(customHeaders){
    Object.keys(customHeaders).forEach(key => {
      headers[key] = customHeaders[key]();
    });
  }
  }

}
