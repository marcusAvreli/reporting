import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
import { DbFieldService } from '../../shared/dbField.service';
import {Input,Checkbox} from 'mgcomponents';
import { DbObjectService } from '../../../function/shared/dbObject.service';
import {Menu,Select} from 'mgcomponents';
import { DbField } from "../../shared/dbField.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";

@Component({
    selector: 'add-field',
    templateUrl: './add-field.component.html',
    styleUrls: ['./add-field.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class AddFieldComponent implements OnInit, OnDestroy,AfterViewInit {
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
					private dbFieldService:DbFieldService
					//brings function list
					,private dbObjectService:DbObjectService						
					,private sharedService: SharedService
				){}
	
	
	onSuccess(data :any){		
	
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

	}
	
	
	save(){
	console.log("save");
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
		console.log("complete");
	}
	 optionChange = (e) => {
		this.inFunctionName = e.target.value;
		this.sharedService.messageSource.next(this.inFunctionName);
	 }
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
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
		this.subscriptions.push(this.dbObjectService.findAll().subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
			)
			)
		
	}
	public ngAfterViewInit(): void {
	/*this.subscription = this.dbFieldService.findAll().subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
		)
		*/
		var functionList = document.getElementById("select_list") as Select;
		functionList.addEventListener("wj:selection-changed", this.optionChange);
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}