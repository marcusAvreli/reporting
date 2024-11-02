import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdDirective } from './ad.directive';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
//import { DefinitionService } from './definition/shared/definition.service';
import {DefinitionListComponent} from './definition/definition-list/definition-list.component';
import {DefinitionComponent} from './definition/definition/definition.component';
import {AddFunctionComponent} from './function/components/add/add-function.component';
import {ListFunctionComponent}from './function/components/list/list-function.component';
import {EditFunctionComponent} from './function/containers/edit/edit-function.component';
import {AddFieldComponent}	from './field/components/add/add-field.component';
import {ListFieldComponent}	from './field/components/list/list-field.component';
import {EditFieldComponent}	from './field/containers/edit/edit-field.component';

import {AddDataSourceComponent}	from './dataSource/components/add/add-data-source.component';
import {ListDataSourceComponent}	from './dataSource/components/list/list-data-source.component';
import {EditDataSourceComponent}	from './dataSource/containers/edit/edit-data-source.component';

import {AddDataSourceColumnComponent} from './sourceColumn/components/add/add-data-source-column.component';
import {ListDataSourceColumnComponent} from './sourceColumn/components/list/list-data-source-column.component';
import {EditDataSourceColumnComponent} from './sourceColumn/containers/edit/edit-data-source-column.component';

import { CONFIG } from "../app-config";
//https://github.com/chayxana/Restaurant-App/blob/develop/src/backend/services/web-app/src/lib/types/food-item.ts
@NgModule({
	declarations: [
		AppComponent
		,AdDirective
		,DefinitionComponent
		,DefinitionListComponent
		,AddFunctionComponent
		,ListFunctionComponent
		,EditFunctionComponent
		,AddFieldComponent
		,ListFieldComponent
		,EditFieldComponent
		,AddDataSourceComponent
		,ListDataSourceComponent
		,EditDataSourceComponent
		
		,AddDataSourceColumnComponent
		,ListDataSourceColumnComponent
		,EditDataSourceColumnComponent
	],
	imports: [
		BrowserModule
		, CoreModule.forRoot(CONFIG)
	],
	entryComponents: [
		DefinitionComponent
		,DefinitionListComponent
		,AddFunctionComponent
		,ListFunctionComponent
		,EditFunctionComponent
		,AddFieldComponent
		,ListFieldComponent
		,EditFieldComponent
		,AddDataSourceComponent
		,ListDataSourceComponent
		,EditDataSourceComponent
		
		,AddDataSourceColumnComponent
		,ListDataSourceColumnComponent
		,EditDataSourceColumnComponent
	]
   , providers: [
    //{ provide: 'api.config', useValue: environment.apiConfig }
	//DefinitionService
	]
	  ,schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
