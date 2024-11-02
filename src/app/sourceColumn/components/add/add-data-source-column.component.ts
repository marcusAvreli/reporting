import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
//import { DbFieldService } from '../../shared/dbField.service';
import {Input,Checkbox} from 'mgcomponents';
import { DbObjectService } from '../../../function/shared/dbObject.service';
import {DataSource}from '../../../dataSource/shared/data-source.model';
import {DataSourceService}from '../../../dataSource/shared/data-source.service';
import { v4 as uuidv4 } from 'uuid';
import {Menu,Select} from 'mgcomponents';
//import { DbField } from "../../shared/dbField.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";
import {Table} from 'mgcomponents';
@Component({
    selector: 'add-data-source-column',
    templateUrl: './add-data-source-column.component.html',
    styleUrls: ['./add-data-source-column.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class AddDataSourceColumnComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;  
 idProp :string;
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
					private dataSourceService:DataSourceService					
					,private sharedService: SharedService
				){
				this.idProp="add_data_source_column_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	
		var table = document.getElementById(this.idProp) as Table;
		if(table){
			//data - list of defined reports
			table.setData(data);
			table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));
		}
	}

	rowSelected(e){
		console.log("row selected");
		//selected defined report
		const selectedRow = e.detail.data[0];
		this.sharedService.messageSource.next(selectedRow);
	}
	
	
	save(){
	console.log("save");
	/*
	const dataSourceNameEl  = document.getElementById("data-source-name") as Input
	const dataSourceDisplayNameEl  = document.getElementById("data-source-display-name") as Input
	const dataSourceDescriptionEl  = document.getElementById("data-source-description") as Input
	
	var dataSource = new DataSource();
	
	if(dataSourceNameEl && dataSourceDisplayNameEl && dataSourceDescriptionEl){
		dataSource.name = this.getValue(dataSourceNameEl);
		dataSource.displayName = this.getValue(dataSourceDisplayNameEl);
		dataSource.description = this.getValue(dataSourceDescriptionEl);
		dataSource.disabled = 1;
		this.subscriptions.push(this.dataSourceService.insert(dataSource).subscribe(() => {console.log("sss")}));
	}
	
	*/
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
	
	refresh(){
	//list of defined reports
		this.subscriptions.push(this.dataSourceService.findAll().subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
		))
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
		/*this.subscriptions.push(this.sharedService.messageSource.subscribe(
		
		(inputValue) => {
					if(inputValue && inputValue.name){
					
						this.fillForm(inputValue);
					}
				}
		));
		*/
		
	}
	public ngAfterViewInit(): void {
	this.refresh();
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}