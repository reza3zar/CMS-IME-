import { AddressDetails } from './../../Models/CustomersModels/Individual/addressDetails';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StackeholdersInformation } from '../../Models/CustomersModels/Common/stackHoldersInformation';


@Component({
  selector: 'app-stackeholders-informations',
  templateUrl: './stackeholders-informations.component.html',
  styleUrls: ['./stackeholders-informations.component.css']
})
export class StackeholdersInformationsComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.showNewRequest=false;
  }
  stackeholdersInformation: StackeholdersInformation=new StackeholdersInformation();
  @Input() gridDataCollection:Array<StackeholdersInformation>=new Array<StackeholdersInformation>();

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      nationalCode: ['', [Validators.required ]],
      postalCode: ['', [Validators.required ]],
      votingRightPercent: ['', [Validators.required ]],
      shareHolderPercent: ['', [Validators.required ]],
  });

  }

  get ctrl() { return this.requestForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;

  }

  if((this.selectedRequestItemResult.id===undefined))
  {
    this.id++;
    this.stackeholdersInformation.id= this.id;
    this.gridDataCollection.push(this.stackeholdersInformation)
  }
  else{

    this.showUpdatedItem(this.stackeholdersInformation)
  }

   this.stackeholdersInformation=this.selectedRequestItemResult=new StackeholdersInformation();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedItem(){
  this.stackeholdersInformation=this.selectedRequestItemResult;
  this.showNewRequest=true;
}

showUpdatedItem(newItem){
  let updateItem = this.gridDataCollection.find(this.findIndexToUpdate, newItem.id);

  let index = this.gridDataCollection.indexOf(updateItem);


  this.gridDataCollection[index] = newItem;

}

findIndexToUpdate(newItem) {
      return newItem.id === this;
}


id=1;
public removeValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).clearValidators();
       form.get(key).updateValueAndValidity();
  }
}

public addValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).setValidators(this.requestForm[key]);
       form.get(key).updateValueAndValidity();
  }
}

disableShowBtn = true;
selectedRequestItemResult=new StackeholdersInformation();
public selected(e) {
  let selectedCredit = new StackeholdersInformation();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as StackeholdersInformation)
    : new StackeholdersInformation();


}
showNewRequest=false;

createNewRequest(){
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.clickedPrevious.emit();

}

onNext(){
  this.clickedNext.emit();
  this.showNewRequest=false;

}

cancel(){
  this.showNewRequest=false;
  this.stackeholdersInformation=new StackeholdersInformation();
  this.disableShowBtn=true;
}

deleteItem(field:StackeholdersInformation) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.stackeholdersInformation=new StackeholdersInformation();


  this.disableShowBtn=true;
}

}
