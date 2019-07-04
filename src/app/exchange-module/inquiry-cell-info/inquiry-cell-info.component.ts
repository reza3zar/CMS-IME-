import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { InquiryService } from "../../services/inquiryService.service";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { NotificationService } from "@progress/kendo-angular-notification";
import { CustomControl } from "../../control-builder/Common/control";
import { VerifyCellPhone } from "../../Models/Misc/verifyCellPhone";
import { GItem } from "../../control-builder/Common/dataGridItem";

@Component({
  selector: "app-inquiry-cell-info",
  templateUrl: "./inquiry-cell-info.component.html",
  styleUrls: ["./inquiry-cell-info.component.css"]
})
export class InquiryCellInfoComponent implements OnInit, OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  public _collectionControls: Array<CustomControl> = new Array<CustomControl>();
  public _collectionControlsTemp: Array<CustomControl> = new Array<
    CustomControl
  >();
  public verifyInfo = new VerifyCellPhone();
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
      ncode: ["", Validators.required],
      cellNumber: ["", Validators.required]
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
          this._collectionControls = [];
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

  get ctrl() {
    return this.requestForm.controls;
  }
  formIsLoaded = false;
  inquiry(): void {
    this.submitted = true;
    this.formIsLoaded = true;

    if (this.requestForm.invalid) {
      return;
    }
    this._collectionControls = [];
    this.sendDataToServer = true;
    this.servicesSubscriber = this.service
      .getVerifyCellInfoIndividualPerson(this.verifyInfo)
      .subscribe(
        dataResult => {
          this._collectionControlsTemp = new Array<CustomControl>();
          this._collectionControlsTemp.push(dataResult as CustomControl);
          this.mapToCoorectFormat(this._collectionControlsTemp);
          this.formIsLoaded = false;
          this.sendDataToServer = false;
        },
        error => {
          console.log(error);
          for (let err of error.error.errors) {
            this.showError(err.message);
          }
          this.formIsLoaded = false;
          this.sendDataToServer = false;
        }
      );
  }
  mapToCoorectFormat(dataResult) {
    for (let key of Object.keys(dataResult[0])) {
      let entity = dataResult[0][key];
      if (entity.type === "collection") {
        let collection = entity.items;

        entity.items = new Array<GItem>();
        let index = 0;
        for (let counter of collection) {
          index++;
          var gItem: any = {};

          for (let key2 of Object.keys(collection[0])) {
            // item.header=collection[0][key2].label;
            gItem[collection[0][key2].label] = collection[0][key2].value;
            // item.rowNumber=index;
          }
          entity.items.push(gItem);
        }
      }
      this._collectionControls.push(entity);
    }
    this._collectionControls = this._collectionControls.sort(
      (a, b) => a.order - b.order
    );
    this.typeOpereation === "showInquiry";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  sendDataToServer = false;

  public showError(err?: any): void {
    //   type: 'slide', duration: 400
    this.notificationService.show({
      content: err,
      animation: { type: "fade", duration: 4000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: false
    });
  }
}
