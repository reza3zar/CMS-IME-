import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import * as moment from "jalali-moment";
import { LegalBasicInformation } from '../../Models/CustomersModels/Legal/legalBasicInformation';

@Component({
  selector: 'app-legal-basic-information',
  templateUrl: './legal-basic-information.component.html',
  styleUrls: ['./legal-basic-information.component.css']
})
export class LegalBasicInformationComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() legalBasicInformation: LegalBasicInformation = new LegalBasicInformation();

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if (this.legalBasicInformation.registerDate === undefined)
      this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
      else
    this.dateObject = moment(
      this.legalBasicInformation.registerDate,
      "jYYYY,jMM,jDD"
    );



    this.requestForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      activityType: ["", Validators.required],
      legalType: ["", Validators.required],
      registerNumber: ["", Validators.required],
      registerCity: ["", Validators.required],
      economicCode: ["", Validators.required],
      nationality: ["", Validators.required],
      dateObject: ["", Validators.required],
      isLocatedInFreeZones: ["" ],
      isLocatedInSpecialEconomicZones: ["" ],
      freeZone: ["" ],
      specialEconomicZones: ["" ],
      nationalCode: ["", [Validators.required]]
    });


  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.clickedNext.emit();
    try {
      this.legalBasicInformation.registerDate = this.dateObject.format(
        "jYYYY/jMM/jD"
      );
    } catch (error ) {

    }

  }

  onPrevious() {
    this.clickedPrevious.emit();
    try {
      this.legalBasicInformation.registerDate = this.dateObject.format(
        "jYYYY/jMM/jD"
      );
    } catch (error) {

    }


  }
}
