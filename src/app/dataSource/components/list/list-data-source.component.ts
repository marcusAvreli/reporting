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
import {DbObject}from '../../../function/shared/dbObject.model';
import {DataSource}from '../../shared/data-source.model';
import {DataSourceService}from '../../shared/data-source.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
@Component({
    selector: 'list-data-source',
    templateUrl: './list-data-source.component.html',
    styleUrls: ['./list-data-source.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class ListDataSourceComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;   
	private categories: Observable<any[]>;
	 @Output() valueSaved = new EventEmitter();   
	  idProp :string;
	  private subscriptions: Subscription[] = [];
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					private el: ElementRef
					,private dbObjectService:DbObjectService
					,private dataSourceService:DataSourceService
					//,private dbFieldService:DbFieldService	
					,private sharedService: SharedService
				){
				this.idProp="data_source_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	

		var table = document.getElementById(this.idProp) as Table;
		if(table){
			//let columns = data.columns;	
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
		
		var dbObject = new DbObject();
		
		if(selectedRow && selectedRow.name){
		this.subscriptions.push(this.dataSourceService.findById(selectedRow.name).subscribe(	
			data => { console.log("success:"+data);
			if(selectedRow){
			var target = {name : selectedRow.name};
			
			this.sharedService.messageSource.next(Object.assign(target, data));
			
			}
			}
			,error => this.handleError(error)
			,() => this.onComplete()
			))
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
	refresh(){
		
		this.subscriptions.push(this.dbObjectService.findAll().subscribe(	
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
	
	/*
		this.subscriptions.push(this.sharedService.messageSource.subscribe((functionName) => {
		if(functionName){
			this.refresh(functionName);
			}
		}));
		*/
	
	}
	public ngAfterViewInit(): void {
	this.refresh();
	
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}