
import { City } from "../Common/city";
import { AddressType } from "../Common/addressType";
import { State } from "../Common/state";

export class AddressDetails{


  private _id : number;
  public get id() : number {
    return this._id;
  }
  public set id(v : number) {
    this._id = v;
  }


  private _state : State;
  public get state() : State {
    return this._state;
  }
  public set state(v : State) {
    this._state = v;
  }



private _city : City;
public get city() : City {
  return this._city;
}
public set city(v : City) {
  this._city = v;
}


private _street : string;
public get street() : string {
  return this._street;
}
public set street(v : string) {
  this._street = v;
}



private _alley : string;
public get alley() : string {
  return this._alley;
}
public set alley(v : string) {
  this._alley = v;
}


private _pelak : string;
public get pelak() : string {
  return this._pelak;
}
public set pelak(v : string) {
  this._pelak = v;
}


private _postalCode : string;
public get postalCode() : string {
  return this._postalCode;
}
public set postalCode(v : string) {
  this._postalCode = v;
}


private _tel : string;
public get tel() : string {
  return this._tel;
}
public set tel(v : string) {
  this._tel = v;
}


private _cellPhone : string;
public get cellPhone() : string {
  return this._cellPhone;
}
public set cellPhone(v : string) {
  this._cellPhone = v;
}


private _email : string;
public get email() : string {
  return this._email;
}
public set email(v : string) {
  this._email = v;
}


private _addressType : AddressType;
public get addressType() : AddressType {
  return this._addressType;
}
public set addressType(v : AddressType) {
  this._addressType = v;
}






}
