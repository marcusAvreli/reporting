import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

import { UVC } from './uvc.model';
import { ApiConfig } from '../../core/models/api-config';
import { ConfigService } from '../../core/services/config.service'
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';
import { map,catchError  } from 'rxjs/operators';
@Injectable()
export class UvcService extends BaseService<UVC> {
	constructor(public http: HttpClient, @Inject('CONFIG') private config: ConfigService) { super(http); }

	public getServiceUrl(): string {
		return CommonUtil.getApiUrl('UVC_SERVICE_URL', this.config);
	}
 
}