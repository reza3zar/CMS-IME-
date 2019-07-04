import { City } from "../Common/city";
import { Country } from "../Common/country";
import { Gender } from "../Common/Gender";
import * as moment from 'jalali-moment';

export class PersonalDetails{


private _firstName : string;
public get firstName() : string {
  return this._firstName;
}
public set firstName(v : string) {
  this._firstName = v;
}


private _lastName : string;
public get lastName() : string {
  return this._lastName;
}
public set lastName(v : string) {
  this._lastName = v;
}



private _gender : Gender;
public get gender() : Gender {
  return this._gender;
}
public set gender(v : Gender) {
  this._gender = v;
}


private _birthDate : string;
public get birthDate() : string {
  return this._birthDate;
}
public set birthDate(v : string) {
 try {
  // if(v===undefined )return;

  // console.log( v.format('jYYYY/jMM/jD)'))
  this._birthDate =  v ;
} catch (error) {
}

}

// private _birthDateMoment :any;
// public get birthDateMoment() : any {
//   return this._birthDateMoment;
// }
// public set birthDateMoment(v :any) {
//   if(v===undefined )return;
//   var  dateObject = moment(v.toString(),'jYYYY,jMM,jDD');
//   console.log( v)
//   console.log(dateObject)
//   this._birthDateMoment =  v ;
// }






private _fatherName : string;
public get fatherName() : string {
  return this._fatherName;
}
public set fatherName(v : string) {
  this._fatherName = v;
}



private _identificationNumber : string;
public get identificationNumber() : string {
  return this._identificationNumber;
}
public set identificationNumber(v : string) {
  this._identificationNumber = v;
}


private _registerCity : City;
public get registerCity() : City {
  return this._registerCity;
}
public set registerCity(v : City) {
  this._registerCity = v;
}


private _nationality : Country;
public get nationality() : Country {
  return this._nationality;
}
public set nationality(v : Country) {
  this._nationality = v;
}


private _seriesIdentification : string;
public get seriesIdentification() : string {
  return this._seriesIdentification;
}
public set seriesIdentification(v : string) {
  this._seriesIdentification = v;
}



// private _serieIdentificationLetter : SerieIdentification;
// public get serieIdentificationLetter() : SerieIdentification {
//   return this._serieIdentificationLetter;
// }
// public set serieIdentificationLetter(v : SerieIdentification) {
//   this._serieIdentificationLetter = v;
// }


// private _serieIdentificationNumber : string;
// public get serieIdentificationNumber() : string {
//   return this._serieIdentificationNumber;
// }
// public set serieIdentificationNumber(v : string) {
//   this._serieIdentificationNumber = v;
// }


private _nationalCode : string;
public get nationalCode() : string {
  return this._nationalCode;
}
public set nationalCode(v : string) {
  this._nationalCode = v;
}





}
