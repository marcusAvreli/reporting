import { Injectable } from '@angular/core';
import { OAuth2Service } from './oauth2.service';

import { StorageService } from "./storage.service";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuardService {
  constructor(
    private httpConfig: ConfigService,
    private authService: OAuth2Service,
    private storage: StorageService
 ) {}

 
}
