
import { Component ,ViewChild, ComponentFactoryResolver} from '@angular/core';
import { AdDirective } from './ad.directive';
import {DefinitionListComponent} from './definition/definition-list/definition-list.component';
import {DefinitionComponent} from './definition/definition/definition.component';
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
export class AppComponent {
  title = 'reporting';
  @ViewChild(AdDirective) adHost: AdDirective;
	public currentComponent = null;
	public components = [DefinitionComponent,DefinitionListComponent];
	
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { 
	if (!customElements.get(Button.is)){
			customElements.define(Button.is, Button);
		}

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
		let componentRef = viewContainerRef.createComponent(componentFactory);
	}
	
}
