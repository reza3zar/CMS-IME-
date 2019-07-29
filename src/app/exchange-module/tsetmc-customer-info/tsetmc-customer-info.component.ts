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
  selector: 'app-tsetmc-customer-info',
  templateUrl: './tsetmc-customer-info.component.html',
  styleUrls: ['./tsetmc-customer-info.component.css']
})
export class TsetmcCustomerInfoComponent implements OnInit,OnDestroy {
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

  mapToCoorectFormat(dataResult) {
    for (let key of Object.keys(dataResult[0])) {

      let mealName = dataResult[0][key];

      this._collectionControls.push(mealName);
    }
    this._collectionControls= this._collectionControls.sort((a, b) => a.order - b.order);
    console.log(this._collectionControls)

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
  inquiryTaxInfo(): void {
    this.submitted = true;
    this.formIsLoaded=true;

    if (this.requestForm.invalid) {
      return;
    }
    this.sendDataToServer=true;
    this._collectionControls=[];
console.log(this.inquiryTax.nationalCode)

    this.servicesSubscriber=  this.service.getCustomerInfoTsetmcbyNationalID(this.inquiryTax.nationalCode).subscribe(dataResult => {

      if(dataResult==null || dataResult.length==0)
      {
        this.showError("اطلاعاتی برای نمایش یافت نشد!");
        this.formIsLoaded=false
        this.sendDataToServer=false;
        return;
      }
      this._collectionControlsTemp =new Array< CustomControl>() ;
      this._collectionControlsTemp.push(dataResult as CustomControl);

      this.mapToCoorectFormat(this._collectionControlsTemp);
      this.formIsLoaded=false
      this.sendDataToServer=false;

    },error=>{
      for (let err of error.error.errors) {
        this.showError(err.message);
    }
      this.formIsLoaded=false;
      this.sendDataToServer=false;
  });
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
}


