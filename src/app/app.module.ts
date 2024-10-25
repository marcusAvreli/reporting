import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdDirective } from './ad.directive';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
//import { DefinitionService } from './definition/shared/definition.service';
import {DefinitionListComponent} from './definition/definition-list/definition-list.component';
import {DefinitionComponent} from './definition/definition/definition.component';
import { CONFIG } from "../app-config";
//https://github.com/chayxana/Restaurant-App/blob/develop/src/backend/services/web-app/src/lib/types/food-item.ts
@NgModule({
  declarations: [
    AppComponent
	, AdDirective
	,DefinitionComponent
	,DefinitionListComponent
  ],
  imports: [
    BrowserModule
	 , CoreModule.forRoot(CONFIG)
  ],
  entryComponents: [
  DefinitionComponent
        ,DefinitionListComponent
		//,DefinitionListComponent
	]
   , providers: [
    //{ provide: 'api.config', useValue: environment.apiConfig }
	//DefinitionService
	]
	  ,schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
