import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeaturesComponent} from "./features.component";
import {NgxCarouselModule} from "ngx-carousel";

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule
  ],
  declarations: [
    FeaturesComponent,
  ],exports:[
    FeaturesComponent
  ]
})
export class FeaturesModule { }
