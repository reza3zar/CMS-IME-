import { brokerRequest } from './../../../Models/CustomersModels/Common/brokerRequest';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../../in-active-background.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { BrokerRequestsService } from '../../../services/broker-requests.service';
import * as moment from "jalali-moment";
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";

  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  public pageSize = 11;
  public skip = 0;
  public state = false;
  private dataRes = [];
  public result;
  public filter: CompositeFilterDescriptor;
  public opened: boolean = false;

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  requestServiceSubscriber: Subscription;

  customerType='';

  public selectedRequestItemResult: brokerRequest = null;

  constructor(
    private brokerRequests:BrokerRequestsService,
      private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notificationService: NotificationService) {
     }

  ngOnInit() {

    this.gridData = {
      data: this.dataRes,
      total: 0
    };

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
         setTimeout(() => {
          this.typeOpereation = "none";
        }, 1000);
      }
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });




    this.requestServiceSubscriber = this.brokerRequests.getBrokerRequests().subscribe(result=>
      {


        this.dataRes = result as brokerRequest[];

        this.gridData.data = this.dataRes;

        try {
          this.gridData.total = this.dataRes.length;
        } catch (ex) {
          console.error(ex);
        }
        this.loadItems();

        this.loadingGrid = false;
      })


    }



  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.requestServiceSubscriber !== undefined) {
      this.requestServiceSubscriber.unsubscribe();
    }
  }

  public sendRequestShowDialog() {
    if (
      this.selectedRequestItemResult == null ||
      this.selectedRequestItemResult === undefined
    )
      return;
    this.opened = true;
  }

  public close(status) {
  //   if (status === "no") {
  //     this.opened = false;
  //     return;
  //   }
  //   this.requestServiceSubscriber = this.creditService
  //   .deleteCreditById(this.selectedRequestItemResult.requestId)
  //   .subscribe(
  //     data => {
  //       this.showNotifySuccessSend(data);
  //       this.creditService.getAllCreditsBaseCredittype("credit");
  //     },
  //     err => {
  //       this.showErrorDelete(err);
  //     }
  //   );
  // this.opened = false;
  }

  public allData(): ExcelExportData {
    var res = this.dataRes;
    const result: ExcelExportData = {
      data: res
    };

    return result;
  }

  showDetails() {
    this.disableShowBtn = true;
    this.panelTypeEnum = "showMode";
    this.typeOpereation = "showDetail";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  public createNewRequest(): void {
    this.typeOpereation = "addNewRequest";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    var resultSort = this.dataRes.slice(this.skip, this.skip + this.pageSize);
    this.gridData = {
      data: resultSort,
      total: this.dataRes.length
    };
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadAllItems();
  }

  public selected(e) {
    let selectedCredit = new brokerRequest();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as brokerRequest)
      : new brokerRequest();
    console.log(this.selectedRequestItemResult);
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadAllItems();
  }
  private loadAllItems(): void {
    var resultSort = orderBy(this.dataRes, this.sort);
    var resultFilter = filterBy(resultSort, this.filter);
    this.gridData = {
      data: resultFilter,
      total: resultFilter.length
    };
  }
  public onCellClick(e: any): void {
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
    }
  }
  public showNotifySuccessSend(da): void {
    this.notificationService.show({
      content: "عملیات ارسال درخواست با موفقیت صورت پذیرفت",
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  public showErrorDelete(err: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content:
        "عملیات حذف با شکست مواجه شد! " +
        " شماره خطا:" +
        err.status +
        "وضعیت خطا : " +
        err.statusText,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: true
    });
  }

  checkIsSelectedRow(itemId: number) {

    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;


    if (this.selectedRequestItemResult.id == itemId) return false;
    return true;
  }
  SaveRequestsFake(request):void{

    console.log(request)
    this.sidebarService.toggle('out');
    this.loadingGrid = true;
    // this.dataRes = this.dataRes as brokerRequest[];
    // var newRequest=(new brokerRequest);
    // newRequest.requestName=request.personalDetails._firstName+' '+request.personalDetails._lastName;
    // this.dataRes[this.dataRes.length+1] =newRequest;

    setTimeout( () => {
      var newRequest=(new Object);
      if(this.customerType=='InteriorIndividual'){
        newRequest['name']=request.personalDetails.firstName+' '+request.personalDetails.lastName;
        newRequest['nationality']=new Object;
        newRequest['nationality'].name=request.personalDetails.nationality.name;
        newRequest['id']= Math.floor(Math.random() * 60) + 1 ;
        newRequest['customerType']=new Object;
        newRequest['customerType'].name='حقیقی';
        newRequest['createDate']=moment(new Date().toLocaleString() ).format('jYYYY/jM/jD HH:mm:ss');
        newRequest['requestStatus']=new Object;
        newRequest['requestStatus'].name='پیشنویس';
        newRequest['requestType']=new Object;
        newRequest['requestType'].name='افزودن مشتری جدید';
        newRequest['responseStatus']=new Object;
        newRequest['responseStatus'].name='ارسال نشده';
        this.dataRes[0] =newRequest;
        this.gridData.data = this.dataRes;
      }
      if(this.customerType=='InteriorLegal'){
        newRequest['name']=request.legalbasicInformation.companyName;
        newRequest['nationality']=new Object;
        newRequest['nationality'].name=request.legalbasicInformation.nationality.name;
        newRequest['id']= Math.floor(Math.random() * 60) + 1 ;
        newRequest['customerType']=new Object;
        newRequest['customerType'].name='حقوقی';
        newRequest['createDate']=moment(new Date().toLocaleString() ).format('jYYYY/jM/jD HH:mm:ss');
        newRequest['requestStatus']=new Object;
        newRequest['requestStatus'].name='پیشنویس';
        newRequest['requestType']=new Object;
        newRequest['requestType'].name='افزودن مشتری جدید';
        newRequest['responseStatus']=new Object;
        newRequest['responseStatus'].name='ارسال نشده';
        this.dataRes[1] =newRequest;
        this.gridData.data = this.dataRes;
      }



      try {

      } catch (ex) {
        console.error(ex);
      }
      this.loadingGrid = false; }, 5000 );

  }

  SetCustomerType(customerType):void{
    this.customerType=customerType;
    console.log(customerType);
  }
}





    //   var listsample=Array<brokerRequest>();
    //  for (let index = 1; index <= 100; index++) {
    //   var sample=new brokerRequest();
    //   sample.requestId=index;
    //   sample.requestName='Customer '+index;
    //   sample.requestId=index;
    //   sample.requestCreateDate=new Date(+(new Date()) - Math.floor(Math.random()*10000000000))



    //   listsample.push(sample);

      // this.dataRes=listsample;
    // this.gridData.data=this.dataRes;
    // this.loadingGrid=false

    //}
