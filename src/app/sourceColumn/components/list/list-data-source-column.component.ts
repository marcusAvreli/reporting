import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services

import {Input,Checkbox,Table,Dialog} from 'mgcomponents';

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
	private reportObj : any;
	 @Output() valueSaved = new EventEmitter();   
	  idProp :string = "testTable2";
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
				//this.idProp="data_source_column_table_"+uuidv4();
				
				}
	
	
	onSuccess(data :any){	
console.log("data_success:"+JSON.stringify(data));
		var table = document.getElementById("testTable2") as Table;
		var dialog = document.getElementById("editRow") as Dialog;
		if(dialog){
				dialog.addEventListener("wj:modalSave",(e)=>this.save(e));
			}
		if(table){
		 var editIcon = function(cell, formatterParams){ //plain text value
             var id = cell.getData().id;
        return '<wj-dialog>Edit</wj-dialog>';
        };
			let columns = data.columns;	
			 columns.push({"title":"Edit" ,"field": "edit"
        
		
		 });
				table.setData(data);
			table.addEventListener("wj:table-built", (e)=>{				table.setData(data);			})
			//table.addEventListener("wj:modalSave",(e)=>this.save(e));	
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
	
	save(e){
	console.log("save_from_ts_2:"+JSON.stringify(e.detail));
	//console.log("save_from_ts_2:"+JSON.stringify(e.detail.reportName));
	if(e.detail){
	var data = e.detail.data;
	data['rprt_name'] = e.detail.reportName;
	delete e.detail['reportName'];
	data['id']=uuidv4().replace(/-/g,'')
	//information about column definition
//	const datum = {e.detail.value,rprt_name: e.detail.reportName}
	this.subscriptions.push(this.rprtColumnService.insert(data).subscribe(() => {
	this.refresh(this.reportObj);
	
	}));
	}
	
		
		 
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
	const reportId = reportObj.id;
		console.log("reportName:"+reportName);
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
			roles: this.rprtColumnService.findById(reportId)
			})
			.subscribe(
      (results) => this.merge(results.user,results.roles,reportId)
	  
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
	merge(rawFields,rprtColumns,reportId){
		const rawFieldsColumns = rawFields.columns;
		
		const rprtColumnsColumns = rprtColumns.columns;
		
		console.log("rprtColumns:"+JSON.stringify(rprtColumns));
		console.log("rprtColumns:"+JSON.stringify(rprtColumnsColumns));
		console.log("rprtColumns:"+JSON.stringify(rawFieldsColumns));
		var rawFieldsData = rawFields.data;
		var rprtColumnsData = rprtColumns.data;
		console.log("rprtColumnsData:"+JSON.stringify(rprtColumnsData));
		
		if(!rprtColumnsData){
			//rprtColumns data is null
			rprtColumnsData =[]
			rawFieldsData.forEach(rawFieldData => {
			//console.log("rprtColumnsData:",rprtColumns.data[0].description);
			//console.log("rprtColumnsData:",rprtColumns.data[1].description);
			
			//console.log("rprtColumnsData:",rprtColumns.data[2].description);
				rprtColumnsData.push({name:rawFieldData.name, rprt_name:rawFieldData.function_name,rprt_id:reportId})
			})
			
			rprtColumns.data = rprtColumnsData
			console.log("rprtColumnsData:"+rprtColumnsData);
			console.log("rprtColumnsData:"+JSON.stringify(rprtColumnsData));
			rprtColumnsColumns.push({"title":"rprt_name" ,"field": "rprt_name"});
			this.onSuccess(rprtColumns);
		}else{
		rprtColumnsColumns.push({"title":"rprt_name" ,"field": "rprt_name"});
		
			rawFieldsData.forEach(rawFieldData => {
				var exists = false;
				//rprtColumnsData.push({name:rawFieldData.name, rprt_name:rawFieldData.function_name})
			rprtColumnsData.forEach( rprtColumnsDatum => 
				{ 
				console.log("filtering_1:"+rawFieldData.function_name);
				console.log("filtering_2:"+rprtColumnsDatum.rprt_name);
					if(rawFieldData.name == rprtColumnsDatum.name){
					exists = true;
					console.log("filtering_3");
					rprtColumnsDatum["rprt_name"]=rawFieldData.function_name;
					}
					})
					if(!exists){
					
					rprtColumnsData.push({name:rawFieldData.name, rprt_name:rawFieldData.function_name,rprt_id:reportId})
					}
			
			
		
			})
			rprtColumns.data = rprtColumnsData;
		
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
		this.reportObj = reportObj;
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