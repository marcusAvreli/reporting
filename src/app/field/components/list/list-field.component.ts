import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
//import { DbObjectService } from '../../shared/dbObject.service';
import {Input,Checkbox,Table} from 'mgcomponents';
//import { DbObject } from "../../shared/dbObject.model";
import { DbField } from "../../shared/dbField.model";
import { DbFieldService } from "../../shared/dbField.service";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'list-field',
    templateUrl: './list-field.component.html',
    styleUrls: ['./list-field.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class ListFieldComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;   
	private categories: Observable<any[]>;
	 idProp :string;
	
	 @Output() valueSaved = new EventEmitter();   
	  private subscriptions: Subscription[] = [];
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					private el: ElementRef
					,private dbFieldService:DbFieldService	
					,private sharedService: SharedService
				){
				this.idProp="field_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){		
	
		var tbl = document.getElementById(this.idProp) as Table;

		if(tbl){
		let columns = data.columns;
			columns.push({"title":"Delete" ,"field": "delete","formatter": "buttonCross"		
		 });
						tbl.setData(data);
			tbl.addEventListener("wj:table-built", (e)=>{
				tbl.setData(data);
			})
			//tbl.addEventListener("wj:slider-move",(e)=>this.test(e));			
			//tbl.addEventListener("wj:delete-row",(e)=>this.deleteRow(e));	
			tbl.addEventListener("wj:tableDeleteRow",(e)=>this.deleteRow(e));
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
		var testValue = e.detail.data;
		console.log("testValue: "+JSON.stringify(testValue));
		this.dbFieldService.delete(testValue).subscribe(
			data => {console.log("hello")}
			,error => this.handleError(error)
			,() => this.onComplete()

		);;
		
		
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
	refresh(functionName:string){
		console.log("Refresh table");
		
		this.subscriptions.push(this.dbFieldService.findById(functionName).subscribe(	
			data => this.onSuccess(data)
			,error => this.handleError(error)
			,() => this.onComplete()
			)
			)
		
	}
	
/*

+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+

*/	
	
	public ngOnInit() {
		this.subscriptions.push(this.sharedService.messageSource.subscribe((functionName) => {
		if(functionName){
			this.refresh(functionName);
			}
		}));
		
	
	}
	public ngAfterViewInit(): void {

	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}