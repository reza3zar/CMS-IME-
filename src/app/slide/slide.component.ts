import { Component, OnInit, OnDestroy } from "@angular/core";
import { Slide } from "../model/slide";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.css"]
})
export class SlideComponent implements OnInit, OnDestroy {
  slides: Slide[];
  carouselSlide: any;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}
