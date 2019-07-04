import { FormBuilderModule } from './control-builder/form-builder.module';
import { HomeModule } from "./home/home.module";


import { BrokerService } from "./services/broker.service";

import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { FeatureService } from "./services/feature.service";
import { NgxCarouselModule } from "ngx-carousel";
import "hammerjs";
import { BannerComponent } from "./banner/banner.component";
import { SiteFeatureService } from "./services/site-feature.service";
import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from "@angular/common";


import { CategoryCreditService } from "./services/categoryCredit.service";


import { PagesMenuComponent } from "./pages-menu/pages-menu.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LOCATION_INITIALIZED } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomerCollectionService } from "./services/customer-collection.service";
import { HttpModule } from "@angular/http";
import { SidebarService } from "./SlideInOutModule/sidebar.service";
import { AddnewpersonComponent } from "./addnewperson/addnewperson.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { GridModule, ExcelModule } from "@progress/kendo-angular-grid";
import { AfterValueChangedDirective } from "./after-value-changed.directive";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { credit } from "./services/credit.service";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { RTL } from "@progress/kendo-angular-l10n";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { CategoryService } from "./services/category.service";
import { Angular2PromiseButtonModule } from "angular2-promise-buttons/dist";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { MenuModule } from "@progress/kendo-angular-menu";
import { LoginComponent } from "./login/login.component";
import { LoginServiceService } from "./services/login-service.service";
import { CookieService } from "ngx-cookie-service";

import { SlideInOutModule } from "./SlideInOutModule/slide-in-out.module";
import { CommonsModule } from "./CommonModule/commons.module";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { LoginLayoutComponent } from './login-layout/login-layout.component';

import { BrokerRequestsService } from "./services/broker-requests.service";
import {IMaskModule} from 'angular-imask';
import { ExchangeModuleModule } from "./exchange-module/exchange-module.module";
import { GlobalErrorHandlerService } from './services/global-error-handler-service.service';

export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector
) {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      );
      locationInitialized.then(() => {
        const langToSet = "en";
        translate.setDefaultLang("en");
        translate.use(langToSet).subscribe(
          () => {},
          err => {
            console.error(
              `Problem with '${langToSet}' language initialization.'`
            );
          },
          () => {
            resolve(null);
          }
        );
      });
    });
}

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,


    PagesMenuComponent,

    AddnewpersonComponent,
    SidebarComponent,
    AfterValueChangedDirective,
    LoginComponent,
    LoginLayoutComponent,


  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxCarouselModule,
    AppRoutingModule,
    ExcelModule,
    IMaskModule,
    ReactiveFormsModule,

    HttpModule,
    GridModule,
    InputsModule,
    LayoutModule,
    DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    MenuModule,
    SlideInOutModule,
    HomeModule,
    ButtonsModule,
    CommonsModule,
    ExchangeModuleModule,
  ],
  providers: [
    CookieService,
    FeatureService,
    SiteFeatureService,
    CategoryCreditService,
    CategoryService,
    SidebarService,
    credit,
    BrokerService,
    LoginServiceService,
    BrokerRequestsService,
    CustomerCollectionService,
    { provide: RTL, useValue: true },
    { provide: APP_BASE_HREF, useValue: "/" },
    //  { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CustomInterceptor ,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
