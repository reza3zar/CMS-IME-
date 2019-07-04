import { Bank } from "../Common/bank";
import { City } from "../Common/city";
import { AccountType } from "../Common/accountType";



export  class BankDetails{

  private _bank : Bank;
  public get bank() : Bank {
    return this._bank;
  }
  public set bank(v : Bank) {
    this._bank = v;
  }


  private _city : City;
  public get city() : City {
    return this._city;
  }
  public set city(v : City) {
    this._city = v;
  }


  private _branchName : string;
  public get branchName() : string {
    return this._branchName;
  }
  public set branchName(v : string) {
    this._branchName = v;
  }


  private _branchCode : string;
  public get branchCode() : string {
    return this._branchCode;
  }
  public set branchCode(v : string) {
    this._branchCode = v;
  }


  private _accountType : AccountType;
  public get accountType() : AccountType {
    return this._accountType;
  }
  public set accountType(v : AccountType) {
    this._accountType = v;
  }


  private _accountNumber : string;
  public get accountNumber() : string {
    return this._accountNumber;
  }
  public set accountNumber(v : string) {
    this._accountNumber = v;
  }


  private _IBANCode : string;
  public get IBANCode() : string {
    return this._IBANCode;
  }
  public set IBANCode(v : string) {
    this._IBANCode = v;
  }


}
