
import { map } from 'rxjs';

import {Inject, Injectable} from '@angular/core';
import { StorageService } from "./storage.service";
import { ConfigService } from "./config.service";
//import {AuthHelper} from './auth.helper';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CoreModule} from './../core.module';
import { Ret } from "../../../ret";
import { catchError, timeout } from "rxjs/operators";
import * as moment from 'moment';
//@Injectable()
@Injectable(
 )
export class OAuth2Service  {
 games = {} as Ret;
   private tokenRenewInterval: any = null;
	private newObj:string = "0";
  //constructor(private http: HttpClient/*, @Inject('api.config') private apiConfig: ApiConfig*/){
   constructor(private storage: StorageService, private config: ConfigService, private http: HttpClient) {/**/


	console.log("OAuth2Service_constructor_called");
	console.log("config:"+JSON.stringify(this.config));
  }
  public initialize() {
  console.log("init");
  //console.log("config:"+JSON.stringify(this.config.protocol));
  console.log("config:"+this.config.authConfig.signin_url);
  
   (async () => {
            
                this.loadEthAddressAsMain(
                    localStorage.getItem("ethAddress")!,
                    localStorage.getItem("token")!,
                    moment.utc(localStorage.getItem("planValidUntil")).toDate()
                 );
                await this.renewToken();
            

        })();
  }
  loadEthAddressAsMain(address: string, token: string, planValidUntil: Date){
	   console.log("loadEthAddressAsMain_called");
	     this.activateRenewInterval();  
	   }
	      public isAuthenticated() {
        if (this.getToken()) {
            return true;
        } else {
            return false;
        }
    }
	  public getToken() {
        return localStorage.getItem("token");
    }
    async renewToken() {
       console.log("renew_token_called");
	  // const textEncoder = new TextEncoder();
	  // let utf8Encode = new TextEncoder();
	  const encoder = new (window as any).TextEncoder('utf8');
var bytesArray = "Basic "+encoder.encode("wY4EtHLqfrRVqKNAW4was3jH0T2SXxXv:iZrH3dJwtohLqQwo");

   
	
        try {
			const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':bytesArray})
}; 
   // const body=JSON.stringify(person);
            var ret = await this.http.post<Ret>(this.config.authConfig.signin_url, null,httpOptions).pipe(
               // timeout(30000), // in ms
                /*catchError((err) => {
                    if (err.name == "HttpErrorResponse" && err.statusText == "Unknown Error") {
                        return of(<Ret>{status: "noop"});
                    } else if (err.name == "HttpErrorResponse" && (err.status == 401 || err.statusText == "Unauthorized")) {
                        return of(<Ret>{status: "unauthorized", message: `HTTP ${err.status}: ${err.message}`});
                    }
                    return of(<Ret>{status: "error", message: `HTTP ${err.status}: ${err.message}`});
                })*/
				//catchError((err) => console.log("error_happend"))
            ).toPromise().then(res => {
			if(res){
			this.games = res;
			}
			}) ;
			console.log("object_token:"+this.games.access_token);
			console.log("expires_in_1:"+this.games.expires_in);
			//timeout(this.games.expires_in);
			// this.tokenRenewInterval=this.games.expires_in;
			 console.log("expires_in_1_1:"+this.games.expires_in);
			    var numberValue = (this.games.expires_in);
				console.log("expires_in_2:"+numberValue);
                localStorage.setItem("token", this.games.access_token);
				localStorage.setItem("expires_in", ""+(numberValue)+"");
                
/*
            if (ret.status == 'noop') {
                // do nothing;
				console.log("do_nothing");
            }
*/			

        } catch(e) {
          // Could not renew the token 
          // TODO: here you can decide to sign out the user, or keep the user signed in and kick him out from the backend.
        }
    }
	
	  private activateRenewInterval() {
	  console.log("active_renew_called");
	   console.log("this.tokenRenewInterval:"+this.tokenRenewInterval);
        if (this.tokenRenewInterval) {
            clearInterval(this.tokenRenewInterval);
        }
		
 this.newObj = localStorage.getItem("expires_in")!;
 console.log("expires_in_3: "+this.newObj);
        this.tokenRenewInterval = setInterval(() => {
            (async () => {
                await this.renewToken();
            })();
        }, Number(this.newObj)*60*1000);
		
    }
}