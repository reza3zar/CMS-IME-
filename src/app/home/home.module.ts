import { CommonsModule } from './../CommonModule/commons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeaturesModule} from "../features/features.module";
import {HomeComponent} from "./home.component";
import {SlideModule} from "../slide/slide.module";
import {OtherSiteModule} from "../other-sites/other-sites.module";
import {HomeRoutingModule} from "./home-routing.module";
import {SiteFeaturesModule} from "../site-features/site-features.module";

@NgModule({
  imports: [
    CommonModule,
    FeaturesModule,
    SlideModule,
    OtherSiteModule,
    HomeRoutingModule
    ,SiteFeaturesModule
    ,CommonsModule
  ],
  declarations: [
     HomeComponent,
  ]
})
export class HomeModule { }
