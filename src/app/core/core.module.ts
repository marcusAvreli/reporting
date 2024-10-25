import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {APP_INITIALIZER, ErrorHandler,Injectable,Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {OAuth2Service} from './services/oauth2.service';
import { ConfigService } from "./services/config.service";
import { IHttpConfig } from "./models/http-config.interface";
import { propertiesResolverFactory } from "./properties-resolver.factory";
import { StorageService } from "./services/storage.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import {DefinitionService} from "../definition/shared/definition.service";
//import { DataSourceService } from "./services/data-source.service";
//import { CharactersService } from "./services/characters.service";
//import { CsrfTokenInterceptor } from "./interceptors/csrf-token.interceptor";
//import { MarvelService } from "./services/marvel.service";
//import { PowersService } from "./services/powers.service";

@NgModule({
	imports: [
		CommonModule
		,HttpClientModule
	]
	,declarations: []
	,providers: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config?: IHttpConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
      ,providers: [
				HttpClientModule,
				StorageService,
				//   AuthGuardService,
				   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
				OAuth2Service
				//,{provide: 'AuthService', useFactory: null, deps: [HttpClient]}
				,HttpClientModule
				,ConfigService
				,{provide: 'CONFIG', useValue: config}
				,{
					provide: APP_INITIALIZER
					,useFactory: propertiesResolverFactory
					,deps: [ ConfigService,OAuth2Service, [new Inject('CONFIG')]]
					,multi: true
				}
				//,{ provide: 'api.config', useValue: environment.apiConfig }
				,DefinitionService

			]
		};
	}

}