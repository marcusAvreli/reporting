import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

import { RprtColumn } from './rprt-column.model';
import { ApiConfig } from '../../core/models/api-config';
import { ConfigService } from '../../core/services/config.service'
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';
import { map,catchError  } from 'rxjs/operators';
@Injectable()
export class RprtColumnService extends BaseService<RprtColumn> {
  constructor(public http: HttpClient, @Inject('CONFIG') private config: ConfigService) { super(http); }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('RPRT_COLUMN_SERVICE_URL', this.config);
  }
  
   public delete(data): Observable<any> {
   console.log("overwritten delete");
   const options = this.getOptionsWithToken("token");

    return this.http.post(this.getServiceUrl()+'/delete',data,options).pipe(catchError(this.handleError));
  }
  
}