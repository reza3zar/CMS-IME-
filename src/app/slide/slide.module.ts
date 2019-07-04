import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlideComponent} from "./slide.component";
import {NgxCarouselModule} from "ngx-carousel";

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule
  ],
  declarations: [
    SlideComponent,

  ],exports:[
    SlideComponent
  ]
})
export class SlideModule { }
