import {Component, Inject,HostListener, OnDestroy, OnInit,AfterViewInit,EventEmitter,Input,OnChanges,SimpleChanges} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
//import { DbObjectService } from '../../shared/dbObject.service';
//import {Input,Checkbox} from 'mgcomponents';
//import { DbObject } from "../../shared/dbObject.model";
import { HttpClient } from '@angular/common/http'; 

import { BehaviorSubject,Observable,Subscription } from "rxjs";
import {Table} from 'mgcomponents';
@Component({
    selector: 'list-edit-report',
    templateUrl: './list-edit-report.component.html',
	  styleUrls: ['./list-edit-report.component.css'],
	
  
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class ListEditReportComponent implements OnInit, OnDestroy,AfterViewInit,OnChanges  {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;   
	private subscription = new Subscription();
	private categories: Observable<any[]>;
	
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					//private dbObjectService:DbObjectService	
				){}
	
	
	
	
	
	 ngOnChanges(changes:  SimpleChanges): void {
    console.log("===========================");
  }
	 @HostListener('unselect', ['$event.target'])
	 onUnSelect(el) {
    console.log(el); // element that triggered event, in this case HTMLUnknownElement
    console.log('unselect triggered');
  }
	getValue(inElement):any{
		/*
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		return;
		*/
		
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
	/*
	
	*/
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
	onSuccess(data :any){		
		/*
		console.log("data:"+JSON.stringify(data));
		var tbl = document.getElementById("dddd") as Table;

		if(tbl){
		tbl.setData(data);
			tbl.addEventListener("wj:table-built", (e)=>{
				tbl.setData(data);
			})
			//tbl.addEventListener("wj:slider-move",(e)=>this.test(e));			
		}
		*/

	}
	
	handleError(data:any){
	
	}
	
	onComplete(){
	
	}
	handleChange2($event){
	
	}
/*

+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+

*/	
	
	public ngOnInit() {
	
	}
	public ngAfterViewInit(): void {
	
	}
	public ngOnDestroy() {
	
	}
}