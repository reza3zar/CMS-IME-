import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {   InquiryService } from "../../services/inquiryService.service";
import { CustomControl } from "../../control-builder/Common/control";
import { inquiryTax } from "../../Models/CustomersModels/Inquiry/taxInquiry";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { Subscription } from "rxjs";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { NotificationService } from "@progress/kendo-angular-notification";
@Component({
  selector: 'app-behinyab-info',
  templateUrl: './behinyab-info.component.html',
  styleUrls: ['./behinyab-info.component.css']
})
export class BehinyabInfoComponent implements OnInit,OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  public _collectionControls:  Array< CustomControl> =new Array< CustomControl>() ;
  public _collectionControlsTemp:  Array< CustomControl>=new Array< CustomControl>() ;
  public inquiryTax:inquiryTax=new inquiryTax();
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";
  public state = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: InquiryService,
    private inActiveServ: InActiveBackgroundService,
    private sidebarService: SidebarService,
    private notificationService: NotificationService
  ) {}
  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  servicesSubscriber: Subscription;

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      nationalCode: ["", Validators.required]
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
        this._collectionControls=[]
          this.typeOpereation = "none";
        }, 1000);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.servicesSubscriber !== undefined) {
      this.servicesSubscriber.unsubscribe();
    }
  }

  
  pageLength=0;
  mapToCoorectFormat(dataResult:any,pageIndex=0) {
    this.pageLength=dataResult.length;
    this._collectionControls=new Array<CustomControl>() ;
    // console.error(dataResult[pageIndex])
    for (let key of Object.keys(dataResult[pageIndex])) {

      let mealName = dataResult[pageIndex][key];

      this._collectionControls.push(mealName);
    }
    console.log(this._collectionControls)
    this._collectionControls= this._collectionControls.sort((a, b) => a.order - b.order);

    
    this.typeOpereation==='showInquiry'
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }
 

  get ctrl() {
    return this.requestForm.controls;
  }
  formIsLoaded=false;
  collectionHelper:any;
  inquiryTaxInfo(): void {
    this.submitted = true;
    this.formIsLoaded=true;

    if (this.requestForm.invalid) {
      return;
    }
    this.sendDataToServer=true;
    this._collectionControls=[];

    try {
      this.servicesSubscriber=  this.service.getBehinyabInfobyNationalID(this.inquiryTax.nationalCode).subscribe(dataResult => {
    if(dataResult==null || dataResult==undefined|| dataResult.length==0)
{
  this.formIsLoaded=false;
  this.sendDataToServer=false;
  this.showError('اطلاعاتی یافت نشد!');
  return;
}
        this._collectionControlsTemp =new Array< CustomControl>() ;
        this._collectionControlsTemp.push(dataResult as CustomControl);
        this.collectionHelper=this._collectionControlsTemp[0];
        this.mapToCoorectFormat(this._collectionControlsTemp[0]);
          
        this.formIsLoaded=false
        this.sendDataToServer=false;
  
      },error=>{
        this.formIsLoaded=false;
        this.sendDataToServer=false;
        for (let err of error.error.errors) {
          this.showError(err.message);
      }
    
    });
    } catch (error) {

      this.formIsLoaded=false;
      this.sendDataToServer=false;
      this.showError(error.message);
    }
}


sendDataToServer=false;

public showError(err?: any): void {
  //   type: 'slide', duration: 400
  this.notificationService.show({
    content:
     err
      ,
    animation: { type: "fade", duration: 4000 },
    position: { horizontal: "center", vertical: "top" },
    type: { style: "error", icon: true },
    closable: false
  });

}

pageChangedOccourred(pageIndexValue)
{
  this.mapToCoorectFormat(this.collectionHelper,pageIndexValue-1)
}

}


