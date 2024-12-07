import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
import {Input} from 'mgcomponents';
import {Menu,Select,Popup,List,Item} from 'mgcomponents';
import {SharedService} from '../../../core/services/shared.service';
import { Observable,Subscription } from "rxjs";
import {UV} from '../../../report/shared/uv.model';
import {Table} from 'mgcomponents';
	import {SingleReportService} from '../../shared/single-report.service';
	import {SingleReport} from '../../shared/single-report.model';
@Component({
    selector: 'single-report',
    templateUrl: './single-report.component.html',
    styleUrls: ['./single-report.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class SingleReportComponent implements OnInit, OnDestroy,AfterViewInit {
	
	idProp :string = "userReport";
	private categories: Observable<any[]>;
	private inFunctionName: string;
	private reportObj : any;
	private uv_display_name:string;
	private uv_description:string;
	private uv_rprt_id:string;
	private uv_id: string;
	@Output() valueSaved = new EventEmitter();   
	private subscriptions: Subscription[] = [];
	
	constructor(
		private singleReportService:SingleReportService
		,private sharedService: SharedService					
			){}
	
	
	onSuccess(data :any){
		if(data){
			var table = document.getElementById(this.idProp) as Table;	
			var columns = data.columns;
			columns = columns.slice().sort((a, b) =>  a.ordering - b.ordering);			
			data.columns = columns;
			if(table){				
				table.setData(data);
				//table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));
			}
		}		
	}
	
	rowSelected(e){
		console.log("selected_row");
		//selected defined report
		const uv_id = e.detail.data[0].id;
		//console.log("selected_row:"+JSON.stringify(selectedRow));
		//this.sharedService.messageSource.next(selectedRow);
	}
	onSuccess2(data:any){}	
	
	getValue(inElement):any{		
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		if(inElement instanceof Select){
			return inElement.value;
		}
		if(inElement instanceof Item){
			return inElement.textContent;
		}
		return;	
	}
	setValue (inElement,inValue):void{
		if(inElement instanceof Input){
			inElement.shadowRoot.querySelector("input").value = inValue;
		}
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
	
	onComplete(){}
	optionChange = (e) => {}
	
	refresh(inReport){
		const reportId = inReport.id;
		console.log("reportId:"+reportId);
		//list of defined reports
		
		this.subscriptions.push(this.singleReportService.findById(reportId).subscribe(	
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
		this.subscriptions.push(this.sharedService.messageSource.subscribe((reportObj) => {
		if(reportObj){
		console.log("=====================SINGLE-REPORT===============");
			this.reportObj = reportObj;		
			this.refresh(reportObj);
			}
		}));
		
		
	}
	public ngAfterViewInit(): void {}
	
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}