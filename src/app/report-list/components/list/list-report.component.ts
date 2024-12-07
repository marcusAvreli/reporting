import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
import { CommonUtil } from '../../../core/utilities/common.util';
import {Input,Button,Textarea,List,Item,LayoutTwoColumns} from 'mgcomponents';
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription ,switchMap,mergeMap} from "rxjs";
import {UvService} from '../../../report/shared/uv.service';
import {UV} from '../../../report/shared/uv.model';

@Component({
    selector: 'list-report',
    templateUrl: './list-report.component.html',
    styleUrls: ['./list-report.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class ListReportComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;  
 idProp :string = "testTable";
	private categories: Observable<any[]>;
	private inFunctionName: string;
	private inputData: any;
	private uv_display_name:string;
	private uv_description:string;
	private uv_rprt_id:string;
	private uv_id: string;
	 @Output() valueSaved = new EventEmitter();   
	   private subscriptions: Subscription[] = [];
	public rowDataSub = new BehaviorSubject([] as any);
	constructor(/*	private heroesService: DataSourceService,private http: HttpClient*/
					//private el: ElementRef
					//private dbFieldService:DbFieldService
					//brings function list
					//,private dbObjectService:DbObjectService
					/*
					private rprtColumnService:RprtColumnService
					,private dataSourceService:DataSourceService
					,private uvcService: UvcService
					*/
					private uvService: UvService
					,private sharedService: SharedService
				
					
				){
			//	this.idProp="add_data_source_column_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	
		//var table = document.getElementById("tableUV") as Table;
		var listUV = document.getElementById("listUV") as List;
		
		if(listUV){
			if(data){
				const columns = data.columns;
				const resultData = data.data;
				console.log("resultList:"+JSON.stringify(resultData));
				resultData.forEach(result => {
					let item = document.createElement("wj-item");
					
					let item_id = document.createElement('div');
					item_id.setAttribute("slot","itemId");
					item_id.textContent=result.id;
					item.appendChild(item_id);
					let label = document.createElement("wj-label");
					label.textContent=result.display_name;
					item.appendChild(label);
					listUV.appendChild(item);
					item.addEventListener("wj-selected-values",(e)=>this.itemSelected(e));
					//table.setData(data);
					//table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));
					}
				)
			}
		}		
	}
	itemSelected(e){
		console.log("type_script_item_selected");
		const selectedRow = e.detail.data[0];
		const rprtUV = e.detail.data.querySelector('[slot="itemId"]').textContent;
		this.subscriptions.push(this.uvService.findById(rprtUV).subscribe(	
			data => this.onSuccess2(data)
			,error => this.handleError(error)
			,() => this.onComplete()
		))
		//console.log("type:"+JSON.stringify(e.detail.data));
		//console.log("type_script_item_selected:"+selectedRow);
	}
	rowSelected(e){
		console.log("selected_row");
		//selected defined report
		const selectedRow = e.detail.data[0];
		console.log("selected_row:"+JSON.stringify(selectedRow));
		this.sharedService.messageSource.next(selectedRow);
	}
	onSuccess2(data:any){
		
		var uvDisplayName = document.getElementById("uv-display-name") as Textarea;
		var uvDesription = document.getElementById("uv-description") as Textarea;
		if(uvDisplayName){
		this.inputData = data.data[0];
		const textarea = uvDisplayName.shadowRoot.querySelector('[id="textarea"]');
		console.log("onSuccess2:"+JSON.stringify(data.data));
		textarea.value=this.inputData.display_name;
		
		const textarea2 = uvDesription.shadowRoot.querySelector('[id="textarea"]');
		textarea2.value=this.inputData.description;
		
		}
	/*
	var sourceList = document.getElementById("sourceList") as List;
		if(sourceList){
			 if(data){
			 const resultData = data.data;
			 console.log("got_function_list:"+JSON.stringify(data));
			 resultData.forEach(result => {
			//console.log("got_function_list:"+JSON.stringify(data));
			let item = document.createElement("wj-item");
			//<wj-label>Baeckeoffe</wj-label>
			//<wj-checkbox slot="end"></wj-checkbox>
			let checkbox = document.createElement("wj-checkbox");
			checkbox.setAttribute("slot","end");
			let item_id = document.createElement('div');
			item_id.setAttribute("slot","itemId");
			item_id.textContent=result.id;
			item.appendChild(item_id);
			item.setAttribute("id","myId");
			let label = document.createElement("wj-label");
			label.textContent=result.name;
			item.appendChild(label);
			item.appendChild(checkbox);
			//item.classList.add("wj-option");
			//item.innerHTML = result.name;
			sourceList.appendChild(item);
			});
			 }
			}
	*/
	}

	
	showFunctionList(){
		console.log("click");
		this.sharedService.messageSource.next(this.inputData);
	}
	
	getValue(inElement):any{
		/*
		if(inElement instanceof Input){
			return inElement.shadowRoot.querySelector("input").value
		}
		*/
		/*
		if(inElement instanceof Select){
			return inElement.value;
		}
		*/
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
		
		this.subscriptions.push(this.uvService.findAll().subscribe(	
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
		
			//table.addEventListener("wj:rowSelectionChanged",(e)=>this.rowSelected(e));
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
		//var wizardReport = document.getElementById("wizard-report") as Wizard;
		//wizardReport.addEventListener("wj:wizard_finished",(e)=>this.wizardFinished(e));
		//wizardReport.addEventListener("wj:wizard_next_step",(e)=>this.wizardNextStep(e));
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}