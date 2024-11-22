import { Injectable, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

import { UV } from './uv.model';
import { ApiConfig } from '../../core/models/api-config';
import { ConfigService } from '../../core/services/config.service'
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';
import { map,catchError  } from 'rxjs/operators';
@Injectable()
export class UvService extends BaseService<UV> {
	constructor(public http: HttpClient, @Inject('CONFIG') private config: ConfigService) { super(http); }

	public getServiceUrl(): string {
		return CommonUtil.getApiUrl('UV_SERVICE_URL', this.config);
	} 
}