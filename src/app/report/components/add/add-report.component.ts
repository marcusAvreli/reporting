import {Component,ElementRef, Inject, OnDestroy, OnInit,AfterViewInit,Output , EventEmitter} from '@angular/core';
//import { DataSourceService } from "../../../core/services/data-source.service";
//import { DataSource } from "../../../core/models/data-source.model";
// services
//import { DbFieldService } from '../../shared/dbField.service';
import {Input,Checkbox} from 'mgcomponents';
import { DbObjectService } from '../../../function/shared/dbObject.service';
import {DataSource}from '../../../dataSource/shared/data-source.model';
import {DataSourceService}from '../../../dataSource/shared/data-source.service';
import { CommonUtil } from '../../../core/utilities/common.util';
import {Menu,Select,Popup,Button,Dialog,Wizard,List,Item} from 'mgcomponents';
//import { DbField } from "../../shared/dbField.model";
import { HttpClient } from '@angular/common/http'; 
import {SharedService} from '../../../core/services/shared.service';
import { BehaviorSubject,Observable,Subscription ,switchMap,mergeMap} from "rxjs";
import {RprtColumnService} from '../../../sourceColumn/shared/rprt-column.service';
import {UvcService} from '../../shared/uvc.service';
import {UvService} from '../../shared/uv.service';
import {UVC} from '../../shared/uvc.model';
import {UV} from '../../shared/uv.model';
import {Table} from 'mgcomponents';
@Component({
    selector: 'add-report',
    templateUrl: './add-report.component.html',
    styleUrls: ['./add-report.component.css']
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class AddReportComponent implements OnInit, OnDestroy,AfterViewInit {
	//public columnNames: any[];
	//public tableData: any[];
	//private rprts: Observable<DataSource[]>;  
 idProp :string = "testTable";
	private categories: Observable<any[]>;
	private inFunctionName: string;
	
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
					private rprtColumnService:RprtColumnService
					,private dataSourceService:DataSourceService
					,private uvcService: UvcService
					,private uvService: UvService
					,private sharedService: SharedService
					
				){
			//	this.idProp="add_data_source_column_table_"+uuidv4();
				}
	
	
	onSuccess(data :any){	
		var dataSource = document.getElementById("dataSource") as Select;
		if(dataSource){
			 if(data){
				const resultData = data.data;
			console.log("resultData:"+JSON.stringify(data));
			resultData.forEach(result => {
			//console.log("got_function_list:"+JSON.stringify(data));
			let item = document.createElement("wj-option");
			//item.classList.add("wj-option");
			
			let item_id = document.createElement('div');
			item_id.setAttribute("slot","itemId");
			item_id.textContent = result.id;
			item.innerHTML = result.name;
			dataSource.appendChild(item);
			item.appendChild(item_id);
			});
			 }
		}
		
	}
	onSuccess2(data:any){
	console.log("onSuccess2:"+data.data);
	
	var sourceList = document.getElementById("sourceList") as List;
	  /*sourceList.addEventListener('wj:checkbox:change', (e) => {
      console.log('source_list_check_box');
	   if(e.target.checked){
		e.target.removeAttribute('checked');
	  }else{
	  e.target.setAttribute("checked","");
	  }
    });
	*/
	var destinationList = document.getElementById("destinationList") as List;
	 /*destinationList.addEventListener('wj:checkbox:change', (e) => {
      console.log('destination_list_check_box');
	 // e.target.checked = e.target.checked;
	  if(e.target.checked){
		e.target.removeAttribute('checked');
	  }else{
	  e.target.setAttribute("checked","");
	  }
    });
	*/
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
	
	}

	wizardFinished(e){
		console.log("wizardFinished");
		const formStepNum = e.detail.formStepsNum-1;
		console.log("wizardFinished",e.detail.formStepsNum);
	
	}
	wizardNextStep(e){
	//console.log("addReport",e.target.detail.formStepsNum);
		console.log("addReport",e.detail.formStepsNum);
		const formStepNum = e.detail.formStepsNum-1;
		var wizardReport = document.getElementById("wizard-report") as Wizard;
		const children = wizardReport.querySelectorAll("wj-wizard-step");
		if(children){			
			switch (formStepNum){
				case 0:
					const dataSourceSelected = children[formStepNum ].querySelector('wj-select[id="dataSource"') as Select;
					const display_name = children[formStepNum ].querySelector('wj-input[id="display_name"]') as Input;
					const descriptionEL = children[formStepNum ].querySelector('wj-input[id="description"]') as Input;
					this.uv_display_name = this.getValue(display_name);
					this.uv_description = this.getValue(descriptionEL);
					this.uv_id=CommonUtil.getId();
					console.log("addtest:"+dataSourceSelected.getSelectedOptions());
					console.log("addtest_slot_selected:"+dataSourceSelected.getSelectedOptions()[0].querySelector('[slot="itemId"]').textContent);
					console.log("addtest:"+dataSourceSelected.querySelector('[slot="itemId"]'));
					this.uv_rprt_id = dataSourceSelected.getSelectedOptions()[0].querySelector('[slot="itemId"]').textContent
					console.log("addtest:"+this.uv_rprt_id);
					//const dataSource = this.getValue(dataSourceSelected);
					//console.log("addReport_dataSource:"+dataSource);
					this.subscriptions.push(this.rprtColumnService.findById(this.uv_rprt_id).subscribe(
						data => this.onSuccess2(data)
						,error => this.handleError(error)
						,() => this.onComplete())
					)
					
				break;
				case 1:
					const destinationList = children[formStepNum ].querySelector('wj-list[id="destinationList"') as List;
					 
					console.log("addReport_destinationList:"+destinationList.children.length);
					const someCollection = destinationList.children
					
					 console.log("addReport_destinationList_someCollection:"+JSON.stringify(someCollection[0]));
					 console.log("addReport_destinationList_someCollection:"+JSON.stringify(someCollection[0].dataPos));
					
					
					
					
					//var resultTest2 = Array.from(someCollection).reduce(this.someFn2, {});
					//var resultTest2 = Array.from(someCollection).every(this.someFn3);
					//var resultTest2 = someCollection.map(this.someFn3,this);
					var resultTest2 = Array.from(someCollection).map(this.someFn3,this);
					console.log("resultTest2:"+JSON.stringify(resultTest2));
					
					
					//const childValue  = this.getValue(childItem);
					//const childId = childItem.querySelector('[slot="itemId"]').textContent;
					//console.log("childId:"+childId);
					
					
					const uv = new UV();
					uv.id = this.uv_id;
					uv.rprt_id = this.uv_rprt_id;
					//uv.name = this.name;
					uv.display_name = this.uv_display_name;
					uv.description = this.uv_description;
					
					
					var observableUV = this.uvService.insert(uv);
					var observableUVC = this.uvcService.insertMany(resultTest2)
					
					observableUV.pipe(
						mergeMap(() => observableUVC)
						
						
						).subscribe(() => {console.log("success")})
					
					
					
					
					
					
				break;
				
				default:
				break;
			}		
		}
	
	}
	someFn3(element,index,array){
	console.log("someFn3_element:"+element);
	console.log("someFn3_element_pos:"+element.getAttribute("data-pos"));
	console.log("someFn3_element_pos:"+element.getAttribute("id"));
	console.log("someFn3_element:"+element.innerText);
	console.log("someFn3_element:"+element.innerHtml);
	console.log("someFn3_element:"+JSON.stringify(element));
	console.log("someFn3_index:"+index);
	console.log("someFn3_length:"+array.length);
	const item = array[index] as Item;
	const ordering = item.getAttribute('data-pos');
	console.log("someFn3_ordering: "+item.querySelector('[slot="itemId"]').textContent);
	
	
	const outUvc  = new UVC();
		outUvc.field_id=item.querySelector('[slot="itemId"]').textContent
		outUvc.ordering=index;
		outUvc.id=CommonUtil.getId();
		outUvc.uv_id=this.uv_id;
	
	return outUvc;
	}
	someFn2(acc,element){
	 
		const outUvc  = new UVC();
		outUvc.field_id=element.querySelector('[slot="itemId"]').textContent;
		outUvc.ordering=1;
		outUvc.id=CommonUtil.getId();
		outUvc.uv_id=this.uv_id;
		acc.push(outUvc);
		
		return acc;
		
	}
	someFn(element){
		const outUvc  = new UVC();
		outUvc.field_id=element.querySelector('[slot="itemId"]').textContent;
		outUvc.ordering=1;
		outUvc.id=CommonUtil.getId();
		outUvc.uv_id='111';
	
		console.log("iterate:"+element.querySelector('[slot="itemId"]').textContent);
		console.log("iterate_1:"+element.textContent);
		console.log("iterate_2:"+element.value);
		return outUvc;
	}
	testSave($event){
	//console.log("save");
	}
	
	
	getValue(inElement):any{
		
		if(inElement.tagName.toLowerCase()==Input.is){
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
	
	
	wizardClosed(e){
	 console.log("add_report_wizard_closed");
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
		var wizardReport = document.getElementById("wizard-report") as Wizard;
		wizardReport.addEventListener("wj:wizard_finished",(e)=>this.wizardFinished(e));
		wizardReport.addEventListener("wj:wizard_next_step",(e)=>this.wizardNextStep(e));
	}
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
}