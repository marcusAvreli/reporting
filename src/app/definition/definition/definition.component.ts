import {Component, Inject, OnDestroy, OnInit,AfterViewInit} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
import { DefinitionService } from '../shared/definition.service';
import {Input,Checkbox} from 'mgcomponents';
import { Rprt } from "../shared/rprt.model";
import { HttpClient } from '@angular/common/http'; 

import { BehaviorSubject,Observable } from "rxjs";

@Component({
    selector: 'definition',
    templateUrl: './definition.component.html',
    styleUrls: ['./definition.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class DefinitionComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;   
	private categories: Observable<any[]>;
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*private heroesService: DataSourceService,private http: HttpClient*/
	private heroesService:DefinitionService
	
	){	}
	
	ngOnInit() {
	
	}
	
	onSuccess(data :any){		
	/*
		var tbl = document.getElementById("dddd") as Table;

		if(tbl){
			tbl.addEventListener("wj:table-built", (e)=>{
				tbl.setData(data);
			})
			tbl.addEventListener("wj:slider-move",(e)=>this.test(e));			
		}
*/
	}
	
	public ngAfterViewInit(): void {
	
	}
	msg(){
	
		//var hero = new DataSource();

		//this.heroesService.getHeroes().subscribe(data => {console.log(data)});
		
		const reportName = document.getElementById("reportName") as Input
		const displayName = document.getElementById("displayName") as Input
		const description = document.getElementById("description") as Input
		const disabled = document.getElementById("disabled") as Checkbox;
		
		var rprt = new Rprt();
		if(reportName){
	
			rprt.name=this.getValue(reportName);
			rprt.displayName=this.getValue(displayName);
			rprt.description=this.getValue(description);
			console.log("checked:"+disabled.checked);
			rprt.disabled=disabled.checked ? 1 : 0
		}
		this.heroesService.insert(rprt).subscribe(() => {console.log("save")});
	}
	ngOnDestroy() {
	
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
	/*
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
	*/
	/*
	public getJSON(): Observable<any> {
		return this.http.get("./assets/advanced.json");
	}
	*/
}