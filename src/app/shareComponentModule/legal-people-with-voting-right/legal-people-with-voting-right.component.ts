import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalPeopleWithVotingRight } from '../../Models/CustomersModels/Common/legalPeopleWithVoting';

@Component({
  selector: 'app-legal-people-with-voting-right',
  templateUrl: './legal-people-with-voting-right.component.html',
  styleUrls: ['./legal-people-with-voting-right.component.css']
})
export class LegalPeopleWithVotingRightComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  legalPeopleWithVotingRight: LegalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  @Input() gridDataCollection:Array<LegalPeopleWithVotingRight>=new Array<LegalPeopleWithVotingRight>();

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      nationalCode: ['', [Validators.required ]],
      phone: ['', [Validators.required ]],
      address: ['', [Validators.required ]],
      postalCode: ['', [Validators.required ]],
      directorateAuthorities: ['', [Validators.required ]],
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
    this.legalPeopleWithVotingRight.id= this.id;
    this.gridDataCollection.push(this.legalPeopleWithVotingRight)
  }
  else{

    this.showUpdatedItem(this.legalPeopleWithVotingRight)
  }

   this.legalPeopleWithVotingRight=this.selectedRequestItemResult=new LegalPeopleWithVotingRight();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedItem(){
  this.legalPeopleWithVotingRight=this.selectedRequestItemResult;
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
selectedRequestItemResult=new LegalPeopleWithVotingRight();
public selected(e) {
  let selectedCredit = new LegalPeopleWithVotingRight();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as LegalPeopleWithVotingRight)
    : new LegalPeopleWithVotingRight();


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
  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  this.disableShowBtn=true;
}

deleteItem(field:LegalPeopleWithVotingRight) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();


  this.disableShowBtn=true;
}

}
