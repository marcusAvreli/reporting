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
import {Menu,Select,Popup,Button,Dialog} from 'mgcomponents';
//import { DbField } from "../../shared/dbField.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";
import {RprtColumnService} from '../../shared/rprt-column.service';
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
 idProp :string = "tblRprt";
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
					private rprtColumnService:RprtColumnService
					,private dataSourceService:DataSourceService					
					,private sharedService: SharedService
					
				){
			//	this.idProp="add_data_source_column_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	
		var table = document.getElementById(this.idProp) as Table;
		
		if(table){
			//data - list of defined reports
		
			let columns = data.columns;
				columns.push({"title":"Delete" ,"field": "delete","formatter": "buttonCross","hozAlign": "center"		
			});
			const resultData = data.data;
			console.log(":resultData:"+JSON.stringify(resultData));
			columns.forEach(column =>{
			if(column.field == "id"){
			column["visible"] = true;
			}
			})
			
			table.setData(data);
			table.addEventListener("wj:tableDeleteRow",(e)=>this.deleteRow(e));
			table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));
			
			
		}else{
		console.log("table_not_found");
		}
	}
	deleteRow(e){
		console.log("edit_data_source");
		var testValue = e.detail.data;
		console.log("testValue: "+JSON.stringify(testValue));
		this.dataSourceService.delete(testValue).subscribe(
			data => {console.log("hello")}
			,error => this.handleError(error)
			,() => this.onComplete()

		);;
		
		
		console.log("testValue:"+JSON.stringify(testValue));
	}
	rowSelected(e){
		console.log("selected_row");
		//selected defined report
		const selectedRow = e.detail.data[0];
		console.log("selected_row:"+JSON.stringify(selectedRow));
		this.sharedService.messageSource.next(selectedRow);
	}
	
	testSave($event){
	console.log("save");
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