
import { map } from 'rxjs';
import { of } from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import { StorageService } from "./storage.service";
import { ConfigService } from "./config.service";
//import {AuthHelper} from './auth.helper';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CoreModule} from './../core.module';
import { Ret } from "../../../ret";
import { catchError, timeout } from "rxjs/operators";
import * as moment from 'moment';
//https://github.com/tiago-peres/ethereum-payment-system/tree/main/frontend/src/app/auth


@Injectable(
 )
export class OAuth2Service  {
	games = {} as Ret;
	private tokenRenewInterval: any = null;
	private expiresIn:string = "0";  
	constructor(private storage: StorageService, private config: ConfigService, private http: HttpClient) {	
	}
	
	public initialize() {
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
		localStorage.setItem("token", token);	
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
		const encoder = new (window as any).TextEncoder('utf8');
		var bytesArray = "Basic "+encoder.encode("wY4EtHLqfrRVqKNAW4was3jH0T2SXxXv:iZrH3dJwtohLqQwo");

   
	
		try {
			const httpOptions = {
				headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':bytesArray})
			}; 

			var ret = await this.http.post<Ret>(this.config.authConfig.signin_url, null,httpOptions).pipe(
				timeout(30000), // in ms
				catchError((err) => {
					if (err.name == "HttpErrorResponse" && err.statusText == "Unknown Error") {					
						return of({status: "noop"});
					} else if (err.name == "HttpErrorResponse" && (err.status == 401 || err.statusText == "Unauthorized")) {					
						return of({status: "unauthorized", message: `HTTP ${err.status}: ${err.message}`});
					}				
					return of({status: "error", message: `HTTP ${err.status}: ${err.message}`});
				})
				
			).toPromise().then(res => {
				if(res){
					var test = res as Ret;			
					
					var numberValue = (test.expires_in);			
					localStorage.setItem("token", test.access_token);
					localStorage.setItem("expires_in", ""+(numberValue)+"");
				}
			}) ;
				
				

		}catch(e) {
			console.log("could_not_renew_token");         
		}
	}
	
	private activateRenewInterval() {	
		this.expiresIn = localStorage.getItem("expires_in")!;	
		setInterval(async () => {await this.renewToken()}, Number(this.expiresIn)*1000);
	}
}