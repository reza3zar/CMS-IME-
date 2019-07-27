import { AllRequestsManagementComponent } from './all-requests-management/all-requests-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRoutingModule } from './exchange-routing.module';
import { SlideInOutModule } from '../SlideInOutModule/slide-in-out.module';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { CommonsModule } from '../CommonModule/commons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ShareComponentModule } from '../shareComponentModule/share-component.module';
import { IMaskModule } from 'angular-imask';
import { InquiryTaxCustomersComponent } from './inquiry-tax-customers/inquiry-tax-customers.component';
import { FormBuilderModule } from '../control-builder/form-builder.module';

import { InquiryLegalPersonComponent } from './inquiry-legal-person/inquiry-legal-person.component';
import { ShowResultInfoComponent } from './show-result-info/show-result-info.component';
import { InquiryDepositoryComponent } from './inquiry-depository/inquiry-depository.component';
import { InquiryFidaLegalPersonComponent } from './inquiry-fida-legal-person/inquiry-fida-legal-person.component';
import { InquiryFidaNaturalPersonComponent } from './inquiry-fida-natural-person/inquiry-fida-natural-person.component';
import { InquiryCellInfoComponent } from './inquiry-cell-info/inquiry-cell-info.component';
import { InquiryCellInfoLegalComponent } from './inquiry-cell-info-legal/inquiry-cell-info-legal.component';
import { InquiryDepositoryByNationalIDComponent } from './inquiry-depository-by-national-id/inquiry-depository-by-national-id.component';
import { BehinyabInfoComponent } from './behinyab-info/behinyab-info.component';
@NgModule({
  imports: [
    CommonModule,
    ExchangeRoutingModule,
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
    InputsModule,
    ShareComponentModule,
    IMaskModule,
    FormBuilderModule
  ],
  declarations: [
    AllRequestsManagementComponent,
    InquiryTaxCustomersComponent,
    ShowResultInfoComponent,
    InquiryLegalPersonComponent,
    InquiryDepositoryComponent,
    InquiryFidaLegalPersonComponent,
    InquiryFidaNaturalPersonComponent,
    InquiryCellInfoComponent,
    InquiryCellInfoLegalComponent,
    InquiryDepositoryByNationalIDComponent,
    BehinyabInfoComponent,
  ]
})
export class ExchangeModuleModule { }
