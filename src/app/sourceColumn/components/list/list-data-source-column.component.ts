import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services

import {Input,Checkbox,Table} from 'mgcomponents';

//import { DbField } from "../../shared/dbField.model";
//import { DbFieldService } from "../../shared/dbField.service";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { DbObjectService } from '../../../function/shared/dbObject.service';
//import {DbObject}from '../../../function/shared/dbObject.model';
import {RprtColumn}from '../../shared/rprt-column.model';
import {RprtColumnService}from '../../shared/rprt-column.service';

import { DbField } from "../../../field/shared/dbField.model";
import { DbFieldService } from "../../../field/shared/dbField.service";

import { BehaviorSubject,Observable,Subscription,forkJoin,map } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
@Component({
    selector: 'list-data-source-column',
    templateUrl: './list-data-source-column.component.html',
    styleUrls: ['./list-data-source-column.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
/*
56
//https://stackoverflow.com/questions/40429666/how-to-unsubscribe-from-an-observable-returned-by-forkjoin
As forkJoin reference says, it

Runs all observable sequences in parallel and collect their last elements.

This means that the operator gets values from completed observables and returns a completed observable with single value. There's no need to unsubscribe from it.
*/
//RelayResultsTable
export class ListDataSourceColumnComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	public tableData: DbField[];
	//private rprts: Observable<DataSource[]>;   
	private categories: Observable<any[]>;
	 @Output() valueSaved = new EventEmitter();   
	  idProp :string;
	  private subscriptions: Subscription[] = [];
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					private el: ElementRef
					//,private dbObjectService:DbObjectService
					//,private dataSourceService:DataSourceService
					,private rprtColumnService:RprtColumnService
					,private dbFieldService : DbFieldService
					,private sharedService: SharedService
				){
				this.idProp="data_source_column_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	
console.log("data_success:"+JSON.stringify(data));
		var table = document.getElementById(this.idProp) as Table;
		if(table){
		 var editIcon = function(cell, formatterParams){ //plain text value
             var id = cell.getData().id;
        return '<wj-button>Edit</wj-Button>';
        };
			let columns = data.columns;	
			 columns.push({"title":"Edit" ,"field": "edit","formatter": editIcon
		
		 });
				table.setData(data);
			table.addEventListener("wj:table-built", (e)=>{
				table.setData(data);
			})
			table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));			
			//table.addEventListener("wj:delete-row",(e)=>this.deleteRow(e));	
		}
	}
	
	rowSelected(e){
		
		const selectedRow = e.detail.data[0];
		
		//var dbObject = new DbObject();
		
		if(selectedRow && selectedRow.name){
		/*this.subscriptions.push(this.dataSourceService.findById(selectedRow.name).subscribe(	
			data => { console.log("success:"+data);
			if(selectedRow){
			var target = {name : selectedRow.name};
			
			this.sharedService.messageSource.next(Object.assign(target, data));
			
			}
			}
			,error => this.handleError(error)
			,() => this.onComplete()
			))
			*/
		}
		
	}
	save(){
	
		//var hero = new DataSource();

		//this.heroesService.getHeroes().subscribe(data => {console.log(data)});
		/*
		const objectName = document.getElementById("object_name") as Input
		const objectType = document.getElementById("object_type") as Input
		
		
		var dbObject = new DbObject();
		if(objectName){
	
			dbObject.object_name=this.getValue(objectName);
			dbObject.object_type=this.getValue(objectType);
			
		}
		this.dbObjectService.insert(dbObject).subscribe(() => {console.log("save_completed");
		
		const domEvent = new CustomEvent('unselect', { bubbles: true });    
		this.el.nativeElement.dispatchEvent(domEvent);
		   this.sharedService.messageSource.next('Hello from child 1!');
		this.valueSaved.emit(dbObject);});
		*/
		 
	}
	
	getValue(inElement):any{
		/*
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		return;
		*/
		
	}
	
	deleteRow(e){
		console.log("edit_data_source");
		var testValue = e.detail.value;
	/*	console.log("testValue: "+JSON.stringify(testValue));
		this.dbFieldService.delete(testValue).subscribe(
			data => {console.log("hello")}
			,error => this.handleError(error)
			,() => this.onComplete()

		);;
		*/
		
		console.log("testValue:"+JSON.stringify(testValue));
	}
	
	
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
	
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
	refresh(reportObj: any){
	console.log("refresh_:"+JSON.stringify(reportObj));
	const reportName = reportObj.name;
		
		/*
		this.subscriptions.push(this.dbFieldService.findById(reportName).subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
			))
			
			*/
			var fields;
			var columns;
			forkJoin(
			{
			user: this.dbFieldService.findById(reportName),
			roles: this.rprtColumnService.findById(reportName)
			})
			.subscribe(
      (results) => this.test2(results.user,results.roles)
	  
	  /*
	  console.log("results:"+results.user);
	  	  console.log("results:"+results.roles);
		    console.log("results:"+JSON.stringify(results.roles));
			 console.log("results:"+JSON.stringify(results.user));
        this.tableData = results.user;
        columns = results.roles;
      */
    )
	console.log("fields:"+this.tableData);
		//this.assign(fields.data[0],columns.data);
	}
	test2(rawFields,rprtColumns){
		const rawFieldsColumns = rawFields.columns;
		const rprtColumnsColumns = rprtColumns.columns;
		
		var rawFieldsData = rawFields.data;
		var rprtColumnsData = rprtColumns.data;
		
		if(!rprtColumnsData){
			//rprtColumns data is null
			rprtColumnsData =[]
			rawFieldsData.forEach(rawFieldData => {
			
				rprtColumnsData.push({name:rawFieldData.name, rprt_name:rawFieldData.function_name})
			})
			rprtColumns.data = rprtColumnsData
			console.log("rprtColumnsData:"+rprtColumnsData);
			this.onSuccess(rprtColumns);
		}

	}
 assign(target: Object, obj: Object) {
    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== 'undefined') {
                target[key] = obj[key];
            }
        }
    });
}
	
/*

+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+

*/	
	
	public ngOnInit() {
	
	
		this.subscriptions.push(this.sharedService.messageSource.subscribe((reportObj) => {
		if(reportObj){
			this.refresh(reportObj);
			}
		}));
	
	
	}
	public ngAfterViewInit(): void {
	//this.refresh();
	
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}