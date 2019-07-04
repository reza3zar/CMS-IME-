import { LegalFinancialDetail } from '../../Models/CustomersModels/Common/legalFinancialDetail';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonalDetails } from '../../Models/CustomersModels/Individual/personalDetails';
import * as moment from "jalali-moment";

@Component({
  selector: 'app-legal-financial-details',
  templateUrl: './legal-financial-details.component.html',
  styleUrls: ['./legal-financial-details.component.css']
})
export class LegalFinancialDetailsComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() financialDetail:LegalFinancialDetail=new LegalFinancialDetail()

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if (this.financialDetail.ratingDate === undefined)
      this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
      else
    this.dateObject = moment(
      this.financialDetail.ratingDate,
      "jYYYY,jMM,jDD"
    );



    this.requestForm = this.formBuilder.group({
      totalAssetsBasedOnTheLatestFinancialStatements: ["", Validators.required],
      recordingCapitalBasedOnTheLatestOfficialNewspaper: ["", Validators.required],
      totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements: ["", Validators.required],
      totalBuysLastYearBasedOnTheLatestFinancialStatements: ["", Validators.required],
      netSalesAndGrossContractRevenueBasedOnTheLatestFinancialStatements: ["", Validators.required],
      isTheCustomerRankedByReference: [""],
      ratingReferenceName: ["", Validators.required],
      ratingDate: [""],
      ratingNumber: ["", Validators.required],
      auctionMarket: [""],
      futureMarket: [""],
      auctionMarketValue: ["", Validators.required],
      futureMarketValue: ["", Validators.required],
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

    this.financialDetail.ratingDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
    console.log(this.financialDetail )

  }

  onPrevious() {
    this.clickedPrevious.emit();

    this.financialDetail.ratingDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );


  }
}
