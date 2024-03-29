import { ProductionInformation } from './../../Models/CustomersModels/Common/productionInformation';
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IdentityDetails } from "../../Models/CustomersModels/Individual/identityDetails";

@Component({
  selector: 'app-legal-production-informations',
  templateUrl: './legal-production-informations.component.html',
  styleUrls: ['./legal-production-informations.component.css']
})
export class LegalProductionInformationsComponent implements OnInit {
  @Input() gridDataCollection: Array<ProductionInformation> = new Array<
  ProductionInformation
  >();

  productionInformation: ProductionInformation = new ProductionInformation();
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      productName: ["", Validators.required],
      amount: ["", Validators.required],
      measurementUnit: ["", Validators.required]

    });
  }
  identityId = 1;

  get ctrl() {
    return this.requestForm.controls;
  }

  selectedRequestItemResult = new ProductionInformation();
  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    if (this.selectedRequestItemResult.id === undefined) {
      this.identityId++;
      this.productionInformation.id = this.identityId;
      this.gridDataCollection.push(this.productionInformation);
    } else {
      this.showUpdatedItem(this.productionInformation);
    }

    this.productionInformation = this.selectedRequestItemResult = new ProductionInformation();
    this.showNewRequest=false;
    this.submitted = false;
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  showUpdatedItem(newItem) {
    let updateItem = this.gridDataCollection.find(
      this.findIndexToUpdate,
      newItem.id
    );

    let index = this.gridDataCollection.indexOf(updateItem);

    this.gridDataCollection[index] = newItem;
  }

  disableShowBtn = true;
  public selected(e) {
    let selectedCredit = new ProductionInformation();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as ProductionInformation)
      : new ProductionInformation();
  }

  showNewRequest = false;

  createNewRequest() {
    this.showNewRequest = true;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onPrevious() {
    this.clickedPrevious.emit();
  }

  onNext() {
    this.clickedNext.emit();
    this.showNewRequest = false;
  }

  cancel() {
    this.showNewRequest = false;
    this.productionInformation = new ProductionInformation();
    this.disableShowBtn = true;
  }

  deleteItem(field: ProductionInformation) {
    //refactor & null Check !
    const arr: any = this.gridDataCollection.find(x => x.id == field.id);
    const indexItem: number = this.gridDataCollection.indexOf(arr);

    if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
    }
  }

  deleteSelectedIdentify() {
    this.deleteItem(this.selectedRequestItemResult);
    this.selectedRequestItemResult = this.productionInformation = new ProductionInformation();
    this.disableShowBtn = true;
  }

  editSelectedIdentify() {
    this.productionInformation = this.selectedRequestItemResult;
    this.showNewRequest = true;
  }
}
