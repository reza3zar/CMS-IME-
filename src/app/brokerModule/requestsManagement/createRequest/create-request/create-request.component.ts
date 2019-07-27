import { HttpClient } from "@angular/common/http";
import { brokerRequest } from "./../../../../Models/CustomersModels/Common/brokerRequest";
import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrokerRequestsService } from "../../../../services/broker-requests.service";
import { Subscription } from "rxjs";
import { NotificationService } from "@progress/kendo-angular-notification";
import { InteriorIndividualBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorIndividualBrokerRequest";
import { BrokerRequestParameter } from "../../../../Models/Misc/BrokerRequestParameter";
import { InteriorLegalBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorLegalBrokerRequest";
import { SidebarService } from "../../../../SlideInOutModule/sidebar.service";
import { stringify } from "querystring";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"]
})
export class CreateRequestComponent implements OnInit, OnDestroy {
  // request: brokerRequest = new brokerRequest();
  requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestInteriorLegal: InteriorLegalBrokerRequest = new InteriorLegalBrokerRequest();

  @Output() clickedSaveRequest = new EventEmitter<any>();
  @Output() clickedCustomerType = new EventEmitter<any>();

  customerTypeDescription = "";
  requestForm: FormGroup;
  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();

  constructor(
    private formBuilder: FormBuilder,
    private service: BrokerRequestsService,

    private sidebarService: SidebarService,
    private notificationService: NotificationService
  ) {}
  submitted = false;

  ngOnInit() {
    this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();

    this.requestForm = this.formBuilder.group({
      customerType: ["", Validators.required],
      customerCode: ["", Validators.required]
    });
  }
  do() {
    // this.http.get("http://localhost:8389/Home/index").subscribe(x=>{
    //   console.log(x)
    // })
  }
  get ctrl() {
    return this.requestForm.controls;
  }
  public pageIndex = 0;
  onNextPage() {
    if (this.pageIndex == 0) {
      this.localSubscriber = this.service
        .chekIsExistExternalId(this.initialParameter.nationalCode)
        .subscribe(result => {
          if (result == true) {
            this.showError();
            return;
          }
        });
    }

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    switch (this.initialParameter.customerType.id) {
      case 1:
        this.customerTypeDescription = "InteriorIndividual";
        this.requestInteriorIndividual.personalDetails.nationalCode = this.initialParameter.nationalCode;
        this.clickedCustomerType.emit('InteriorIndividual');
        break;
      case 2:
        this.customerTypeDescription = "ExteriorIndividual";
        this.clickedCustomerType.emit('ExteriorIndividual');

        break;
      case 3:
        this.customerTypeDescription = "InteriorLegal";
        this.requestInteriorLegal.legalbasicInformation.nationalCode = this.initialParameter.nationalCode;
        this.clickedCustomerType.emit('InteriorLegal');

        break;
      case 4:
        this.customerTypeDescription = "ExteriorLegal";
        this.clickedCustomerType.emit('ExteriorLegal');

        break;
      default:
        break;
    }

    // if((typeof(this.creditDecider.customer.customerId)==='undefined'||typeof(this.creditDecider.broker.brokerId)==='undefined') && typeof(this.creditDecider.category.id)==='undefined')
    //   return;

    // if (this.pageIndex == 12222) return;
    this.pageIndex++;
  }

  public onPerviousPage() {
    if (this.pageIndex == 0){
      this.sidebarService.toggle('out');
      return;
    }
    this.pageIndex--;
  }

  localSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    this.submitted;
  }

  public showError(err?: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content: " با اطلاعات وارد شده،مشتری ثبت شده است",
      animation: { type: "fade", duration: 4000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: false
    });
  }

  saveRequest(): void {

    if (this.customerTypeDescription == "InteriorIndividual")
    {

      console.log(this.requestInteriorIndividual);
      console.log(JSON.stringify(this.requestInteriorIndividual) )
      this.clickedSaveRequest.emit(this.requestInteriorIndividual);
    }

      if (this.customerTypeDescription == "InteriorLegal")
      {
        console.log(this.requestInteriorLegal);
        this.clickedSaveRequest.emit(this.requestInteriorLegal);
      }

  }
}
