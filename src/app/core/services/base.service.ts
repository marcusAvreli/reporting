import { Injectable } from '@angular/core';
//https://stackoverflow.com/questions/38510369/cannot-find-module-angular-http
//import {  Response, Headers, RequestOptions } from '@angular/http';
import {HttpClient/*Response/*, Headers/*, RequestOptions*/} from '@angular/common/http'
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable ,throwError } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';
import {OAuth2Service} from './oauth2.service';
//https://github.com/chayxana/Restaurant-App/blob/0e9e0a99cb420b7106548ceab06c31f552355a61/src/backend/services/web.admin/dashboard/src/app/services/base.service.ts#L51
export abstract class BaseService<T> {

	constructor(protected http: HttpClient) { }
  /**
   * Load the base service url by configuration
   */
  public abstract getServiceUrl(): string;

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<T> {
  const options = this.getOptionsWithToken("token");
    return this.http.get(this.getServiceUrl() + '/' + id,options).pipe(map(this.extractData), catchError(this.handleError));
      
  }
//https://stackoverflow.com/questions/37208801/property-map-does-not-exist-on-type-observableresponse
  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(): Observable<T[]> {
  console.log("this.getServiceUrl(): "+this.getServiceUrl());
  const options = this.getOptionsWithToken("token");
    return this.http.get(this.getServiceUrl()+"/getAll",options).pipe(map(this.extractData), catchError(this.handleError));
	  //map(this.extractData);
  }
 protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<any> {
   const options = this.getOptionsWithToken("token");

    return this.http.delete(this.getServiceUrl() + '/' + id,options).pipe(catchError(this.handleError));;
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: T): Observable<any> {
   const options = this.getOptionsWithToken("token");
   console.log("base_service:"+JSON.stringify(data));
    return this.http.post(this.getServiceUrl()+"/create", data,options).pipe(catchError(this.handleError));;
  }
  
  protected extractData(res: any) {
    return res;
  }
  
  /**
   * Updadte specific object into DB
   * @param fieldId the name of the field that identify the object
   * @param data the object to be updated
   * @returns gets the response
   */
  public update(fieldId: string, data: T): Observable<any> {
  const options = this.getOptionsWithToken("token");
    return this.http.put(this.getServiceUrl() + '/' + data[fieldId], JSON.stringify(data), options ).pipe(catchError(this.handleError));
  }

  /**
   * Extract data that arrives from the response
   * @param res the response
   */
   /*
  protected extractData(res: Response) {
    const body = res.json() || {};
    return body.data || body;
  }
  */
  protected getOptionsWithToken(token: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
	  'Accept': 'application/json',
	'Access-Control-Allow-Methods':'GET, POST, PATCH, DELETE, PUT, OPTIONS',
	  'Access-Control-Allow-Headers': 'access-control-allow-headers,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
	   
      'Authorization': 'Bearer '+localStorage.getItem("token")!
    });
    const options = {
      headers: headers
    };
    return options;
  }
  
}