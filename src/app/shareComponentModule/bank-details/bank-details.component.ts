import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankDetails } from '../../Models/CustomersModels/Individual/bankeDetails';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  @Input() bankInfo:BankDetails=new BankDetails();
  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      bank: ['', Validators.required],
      city: ['', Validators.required],
      branchName: ['', [Validators.required ]],
      branchCode: ['', [Validators.required ]],
      accountTypes: ['', Validators.required],
      accountNumber: ['', [Validators.required ]],
      IBANCode: ['', [Validators.required ]],
  });

  }


  get ctrl() { return this.requestForm.controls; }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  @Output() clickedSaveRequest = new EventEmitter<void>();


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
  }
  this.clickedSaveRequest.emit();

  // this.clickedNext.emit();
  // console.log(this.personalDetailsInformation)
}


onPrevious(){
  this.clickedPrevious.emit();

}
}
