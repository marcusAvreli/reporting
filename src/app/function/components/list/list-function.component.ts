import {Component, HostListener,Inject, OnDestroy, OnInit,AfterViewInit,Input ,Output,SimpleChange ,ChangeDetectionStrategy,OnChanges, EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
import { DbObjectService } from '../../shared/dbObject.service';
import {Checkbox} from 'mgcomponents';
import { DbObject } from "../../shared/dbObject.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';

import { BehaviorSubject,Observable,Subscription } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import {Table} from 'mgcomponents';
@Component({
    selector: 'list-function',
    templateUrl: './list-function.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./list-function.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class ListFunctionComponent implements OnInit, OnDestroy,AfterViewInit ,OnChanges{
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;   

	private categories: Observable<any[]>;
	public rowDataSub = new BehaviorSubject([] as any);
	  private subscriptions: Subscription[] = [];
	  	  idProp :string = "function_list_table2";

	@Input() valueSaved;
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					private dbObjectService:DbObjectService	
					,private sharedService: SharedService
				){
				
				//this.idProp="function_list_table_"+uuidv4();
				
				}
	
	
	
	
 ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    console.log("===========================");
  }
	/*
	getValue(inElement):any{
		
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		return;
		
	}
	*/
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
	/*
	
	*/
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
	onSuccess(data :any){		
	console.log("data:"+JSON.stringify(data));
		var tbl = document.getElementById(this.idProp) as Table;

		if(tbl){
		let columns = data.columns;
		 columns.push({"title":"Delete" ,"field": "delete","formatter": "buttonCross"
		
		 });
		tbl.setData(data);
			tbl.addEventListener("wj:table-built", (e)=>{
				tbl.setData(data);
			})
				//tbl.addEventListener("wj:delete-row",(e)=>this.deleteRow(e));
				tbl.addEventListener("wj:tableDeleteRow",(e)=>this.deleteRow(e));
			//tbl.addEventListener("wj:slider-move",(e)=>this.test(e));			
		}

	}
	deleteRow(e){
		console.log("edit_data_source");
		var testValue = e.detail.data;
		console.log("testValue: "+JSON.stringify(testValue));
		this.dbObjectService.delete(testValue).subscribe(
			data => {console.log("hello")}
			,error => this.handleError(error)
			,() => this.onComplete()

		);;
		
		
		
		//console.log("testValue:"+JSON.stringify(testValue));
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
	handleChange2(event){
		console.log("update");
	}
	
	refresh(){
		console.log("===============================");
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
	 this.subscriptions.push(this.sharedService.messageSource.subscribe((message) => {
           this.refresh();
        }));
	}
	public ngAfterViewInit(): void {
		this.refresh();
	
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}