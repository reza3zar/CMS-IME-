import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OtherSitesComponent} from "./other-sites.component";
import {NgxCarouselModule} from "ngx-carousel";

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule
  ],
  declarations: [
    OtherSitesComponent,

  ],exports:[
    OtherSitesComponent
  ]
})
export class OtherSiteModule { }
