import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
//import { DbFieldService } from '../../shared/dbField.service';
import {Input,Checkbox} from 'mgcomponents';
import { DbObjectService } from '../../../function/shared/dbObject.service';
import {DataSource}from '../../shared/data-source.model';
//DataSourceEP
import {DataSourceService}from '../../shared/data-source.service';

import {Menu,Select} from 'mgcomponents';
//import { DbField } from "../../shared/dbField.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
@Component({
    selector: 'add-data-source',
    templateUrl: './add-data-source.component.html',
    styleUrls: ['./add-data-source.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class AddDataSourceComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;  

	private categories: Observable<any[]>;
	private inFunctionName: string;
	 @Output() valueSaved = new EventEmitter();   
	   private subscriptions: Subscription[] = [];
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					//private el: ElementRef
					//private dbFieldService:DbFieldService
					//brings function list
					//,private dbObjectService:DbObjectService
					//DataSourceEP
					private dataSourceService:DataSourceService					
					,private sharedService: SharedService
				){}
	
	
	onSuccess(data :any){		
	/*
		if(data){
		

		var functionList = document.getElementById("select_list") as Select;
		if(functionList){
			const resultData = data.data;
			
			resultData.forEach(result => {
			//console.log("got_function_list:"+JSON.stringify(data));
			let item = document.createElement("wj-option");
			//item.classList.add("wj-option");
			item.innerHTML = result.name;
			functionList.appendChild(item);
			});
		}
		}
*/
	}
	
	
	save(){
	console.log("save");
	
	const dataSourceNameEl  = document.getElementById("data-source-name") as Input
	const dataSourceDisplayNameEl  = document.getElementById("data-source-display-name") as Input
	const dataSourceDescriptionEl  = document.getElementById("data-source-description") as Input
	
	var dataSource = new DataSource();
	//DataSourceEP
	if(dataSourceNameEl && dataSourceDisplayNameEl && dataSourceDescriptionEl){
		dataSource.name = this.getValue(dataSourceNameEl);
		dataSource.display_name = this.getValue(dataSourceDisplayNameEl);
		dataSource.description = this.getValue(dataSourceDescriptionEl);
		dataSource.disabled = 1;
		dataSource.id=uuidv4().replace(/-/g,'');
		this.subscriptions.push(this.dataSourceService.insert(dataSource).subscribe(() => {console.log("sss")}));
	}
	
	
	/*
		//var hero = new DataSource();

		//this.heroesService.getHeroes().subscribe(data => {console.log(data)});
		
		const fieldName = document.getElementById("fieldName") as Input
		
		
		
		var dbField = new DbField();
		if(fieldName){
	
			dbField.name=this.getValue(fieldName);
			dbField.functionName=this.inFunctionName;
			//dbObject.object_type=this.getValue(objectType);
			
		}
		this.subscriptions.push(this.dbFieldService.insert(dbField).subscribe(() => {this.sharedService.messageSource.next(this.inFunctionName)}));
		*/
		/*
		const domEvent = new CustomEvent('unselect', { bubbles: true });    
		this.el.nativeElement.dispatchEvent(domEvent);
		   this.sharedService.messageSource.next('Hello from child 1!');
		this.valueSaved.emit(dbObject);};
		*/
		
		 
	}
	
	getValue(inElement):any{
		
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		return;
		
		
	}
	setValue (inElement,inValue):void{
		if(inElement instanceof Input){
			inElement.shadowRoot.querySelector("input").value = inValue;
		}
	}
	/*
	test(e){
		console.log("edit_data_source");
		var testValue = e.detail.value;
		this.heroesService.deleteHero(testValue).subscribe(
			data => {console.log("hello")}
			,error => this.handleError(error)
			,() => this.onComplete()

		);;
		
		
		console.log("testValue:"+JSON.stringify(testValue));
	}
	*/
	
	handleError(data:any){
		console.log("error_handling","************");
		console.log("error_handling","start");
		console.log("error_handling","ok:"+data.ok);
		console.log("error_handling","message:"+data.message);
		console.log("error_handling","status:"+data.status);
		console.log("error_handling","status_text:"+data.statusText);
		console.log("error_handling","error_name:"+data.name);
		console.log("error_handling","finish");
		console.log("error_handling","************");
		
	}
	
	onComplete(){
		//console.log("complete");
	}
	 optionChange = (e) => {
		//this.inFunctionName = e.target.value;
		//this.sharedService.messageSource.next(this.inFunctionName);
	 }
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
	
	setReportName(inputValue:any){
	const dataSourceNameEl = document.getElementById("data-source-name") as Input
	if(inputValue && inputValue.name){
	const dataSourceName = inputValue.name;
	
	this.setValue(dataSourceNameEl,inputValue.name);
	}
	}
	
	fillForm(inOject : any){
	
		this.subscriptions.push(this.dataSourceService.findById(inOject.name).subscribe(
		(data) => {
			const dataSourceNameEl  = document.getElementById("data-source-name") as Input
			const dataSourceDisplayNameEl  = document.getElementById("data-source-display-name") as Input
			const dataSourceDescriptionEl  = document.getElementById("data-source-description") as Input
			
			this.setValue(dataSourceNameEl,inOject.name);
			this.setValue(dataSourceDisplayNameEl,inOject.display_name);
			this.setValue(dataSourceDescriptionEl,inOject.description);
		}
		//{console.log("sss:"+JSON.stringify(data))}
		));
	}
/*

+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+

*/	
	
	public ngOnInit() {
		console.log("===============================");
		
		
		console.log("===============================");
		/*
		this.subscriptions.push(this.dbObjectService.findAll().subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
			)
			)
			*/
		this.subscriptions.push(this.sharedService.messageSource.subscribe(
		
		(inputValue) => {
					if(inputValue && inputValue.name){
					
						this.fillForm(inputValue);
					}
				}
		));
		
	}
	public ngAfterViewInit(): void {
	/*this.subscription = this.dbFieldService.findAll().subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
		)
		*/
		//var functionList = document.getElementById("select_list") as Select;
		//functionList.addEventListener("wj:selection-changed", this.optionChange);
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}