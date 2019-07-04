import { ShareComponentModule } from './../shareComponentModule/share-component.module';

import { CommonsModule } from "./../CommonModule/commons.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SlideInOutModule } from "../SlideInOutModule/slide-in-out.module";
import { GridModule, ExcelModule } from "@progress/kendo-angular-grid";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { BrokerRoutingModule } from "./broker-routing.module";
import { InteriorIndividualRequestComponent } from './interior-individual-request/interior-individual-request.component';
import { RequestsComponent } from './requestsManagement/requests/requests.component';
import { RequestBarComponent } from './requestsManagement/request-bar/request-bar.component';
import { CreateRequestComponent } from './requestsManagement/createRequest/create-request/create-request.component';
import { IMaskModule } from 'angular-imask';

 
@NgModule({
  imports: [ 
    CommonModule,
    BrokerRoutingModule,
    SlideInOutModule,
    GridModule,
    ExcelModule,
    InputsModule,
    LayoutModule,
    DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    FormsModule,
    InputsModule,
    ShareComponentModule,
    IMaskModule,
  ],
  declarations: [
    InteriorIndividualRequestComponent,
    RequestsComponent,
    RequestBarComponent,
    CreateRequestComponent,
  ]
})
export class BrokerModule { }
