
import { Component ,ViewChild, ComponentFactoryResolver,OnDestroy, ComponentRef} from '@angular/core';
import { AdDirective } from './ad.directive';
import {DefinitionListComponent} from './definition/definition-list/definition-list.component';
import {DefinitionComponent} from './definition/definition/definition.component';
import {AddFunctionComponent} from './function/components/add/add-function.component';
import {ListFunctionComponent} from './function/components/list/list-function.component';
import {EditFunctionComponent} from './function/containers/edit/edit-function.component';
import {AddFieldComponent}	from './field/components/add/add-field.component';
import {EditFieldComponent} from './field/containers/edit/edit-field.component';
import {EditDataSourceComponent}  from './dataSource/containers/edit/edit-data-source.component';
import {EditDataSourceColumnComponent}  from './sourceColumn/containers/edit/edit-data-source-column.component';
import {EditReportComponent}  from './report/containers/edit/edit-report.component';
import {ListEditReportComponent}  from './report-list/containers/edit/list-edit-report.component';
import {
Animation
,Aside
,Avatar
,Button
,WizardButton
,Container
,Icon
,Input
,Item
,Label
,Img
,Badge
,Breadcrumb
,Breadcrumbs
,Card
,CardContent
,CardControls
,CardHeader
,CardSubtitle
,CardTitle
,Carousel
,CarouselItem
,Checkbox
,Chip
,Col
,ColorPicker
,CopyButton
,Divider
,Dialog
//31-05-2024
, Dropdown
,Footer
,FormatDigital
,Grid
,Header
// ,IconPicker
,Table
,Tooltip

,Toast
,List
,Main
,Menu
,MenuItem
,Popup
,Panel
,ProgressBar
,Radio
,RadioGroup
,Rate
,RelativeTime
,Row
,Select
,Slider
,SplitView

,Tab
,TabGroup
,TabPanel
,Wizard
,WizardNav
 
	} from 'mgcomponents';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'reporting';
  @ViewChild(AdDirective) adHost: AdDirective;
   componentRef: ComponentRef<any>;
	public currentComponent = null;
	public components = [DefinitionComponent,DefinitionListComponent/*,AddFunctionComponent,ListFunctionComponent*/,EditFunctionComponent,EditFieldComponent,EditDataSourceComponent,EditDataSourceColumnComponent,EditReportComponent,ListEditReportComponent];
	
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
	if (!customElements.get(Button.is)){
			customElements.define(Button.is, Button);
		}

	}
	public showAvailableReports(){
		const currentComponent = this.components[7];		
		this.setElement(currentComponent);
	}
	public showConf(){
		const currentComponent = this.components[6];		
		this.setElement(currentComponent);
	}
	public showDataSourceColumn(): void {
		const currentComponent = this.components[5];		
		this.setElement(currentComponent);
	
	
	}
	public showDataSource(): void {
		const currentComponent = this.components[4];		
		this.setElement(currentComponent);
	
	
	}
	public showField(): void {
		const currentComponent = this.components[3];		
		this.setElement(currentComponent);
	
	
	}
	public showFunctionEditor(): void {
		const currentComponent = this.components[2];		
		this.setElement(currentComponent);
	
	
	}
	public showFunctionList(): void {
		const currentComponent = this.components[2];		
		this.setElement(currentComponent);
	
	
	}
    public renderIdentity(): void {
		const currentComponent = this.components[0];		
		this.setElement(currentComponent);
	
	
	}
	
	public renderCertification(): void {
		const currentComponent = this.components[1];
		this.setElement(currentComponent);
	
	}
	
	setElement(currentComponent : any){
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentComponent as any);
		let viewContainerRef = this.adHost.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(componentFactory);
		this.componentRef.changeDetectorRef.detectChanges();
		

	}
	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
	
}
