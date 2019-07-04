import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FinancialDetails } from '../../Models/CustomersModels/Individual/financialDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-financial-details',
  templateUrl: './personal-financial-details.component.html',
  styleUrls: ['./personal-financial-details.component.css']
})
export class PersonalFinancialDetailsComponent implements OnInit {
  @Input() financialDetail:FinancialDetails=new FinancialDetails()

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {

   }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      ownerShipValue: ['', Validators.required],
      averageSalaryPermonths: ['', Validators.required],
      predictContractValueINFutureMarket: ['', [Validators.required ]],
      predictContractValueINAuctionMarket: ['', [Validators.required ]],
      isAuctionMarket: ['', [ ]],
      isFutureMarket: ['', [ ]],
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

}


onPrevious(){
  this.clickedPrevious.emit();

}
}
