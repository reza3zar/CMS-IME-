import { workingDetails } from './../../Models/CustomersModels/Individual/workingDetails';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from "jalali-moment";
@Component({
  selector: 'app-personal-working-details',
  templateUrl: './personal-working-details.component.html',
  styleUrls: ['./personal-working-details.component.css']
})
export class PersonalWorkingDetailsComponent implements OnInit {
  @Input() workingInfo:workingDetails=new workingDetails();
  submitted = false;
  dateObject: moment.Moment;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.workingInfo.jobDate === undefined)
    this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
    else
  this.dateObject = moment(
    this.workingInfo.jobDate,
    "jYYYY,jMM,jDD"
  );


    this.requestForm = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      jobDate: ['', Validators.required],
      companyName: ['', ],
      position: ['', [Validators.required ]],
      educationLevel: ['', [Validators.required ]],
  });

  }

  get ctrl() { return this.requestForm.controls; }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
  }
  this.clickedNext.emit();

  this.workingInfo.jobDate = this.dateObject.format(
    "jYYYY/jMM/jD"
  );
  // console.log(this.personalDetailsInformation)
}


onPrevious(){
  this.clickedPrevious.emit();
  this.workingInfo.jobDate = this.dateObject.format(
    "jYYYY/jMM/jD"
  );
}
}
