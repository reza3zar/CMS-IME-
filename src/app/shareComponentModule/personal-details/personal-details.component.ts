import { PersonalDetails } from "./../../Models/CustomersModels/Individual/personalDetails";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as moment from "jalali-moment";
@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.css"]
})
export class PersonalDetailsComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() personalDetailsInformation: PersonalDetails = new PersonalDetails();

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if (this.personalDetailsInformation.birthDate === undefined)
      this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
      else
    this.dateObject = moment(
      this.personalDetailsInformation.birthDate,
      "jYYYY,jMM,jDD"
    );



    this.requestForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      dateObject: ["", [Validators.required]],
      fatherName: ["", [Validators.required]],
      identificationNumber: ["", [Validators.required]],
      registerCity: [""],
      nationality: [""],
      serialIdentification: ["", [Validators.required]],
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

    this.personalDetailsInformation.birthDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
  }

  onPrevious() {
    this.clickedPrevious.emit();

    this.personalDetailsInformation.birthDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );


  }
}
