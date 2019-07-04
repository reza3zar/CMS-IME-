import { RequestStatus } from "./requestStatus";
import { ResponseStatus } from "./responseStatus";
import { Country } from "./country";
import { CustomerType } from "./customerType";
import { InteriorIndividualRequest } from "../Request/InteriorIndividualRequest/interiorIndividualRequest";

export class brokerRequest {

  public id:number;

  private _requestId: number;
  public get requestId(): number {
    return this._requestId;
  }
  public set requestId(v: number) {
    this._requestId = v;
  }

  private _customerType: CustomerType;
  public get customerType(): CustomerType {
    return this._customerType;
  }
  public set customerType(v: CustomerType) {
    this._customerType = v;
  }

  private _nationality: Country;
  public get nationality(): Country {
    return this._nationality;
  }
  public set nationality(v: Country) {
    this._nationality = v;
  }

  private _requestCreateDate: Date;
  public get requestCreateDate(): Date {
    return this._requestCreateDate;
  }
  public set requestCreateDate(v: Date) {
    this._requestCreateDate = v;
  }

  private _requestStatus: RequestStatus;
  public get requestStatus(): RequestStatus {
    return this._requestStatus;
  }
  public set requestStatus(v: RequestStatus) {
    this._requestStatus = v;
  }

  private _responseStatus: ResponseStatus;
  public get responseStatus(): ResponseStatus {
    return this._responseStatus;
  }
  public set responseStatus(v: ResponseStatus) {
    this._responseStatus = v;
  }

  private _requestName: string;
  public get requestName(): string {
    return this._requestName;
  }
  public set requestName(v: string) {
    this._requestName = v;
  }

  public nationalCode: string;

  // private _nationalCode : string;
  // public get nationalCode() : string {
  //   return this._nationalCode;
  // }
  // public set nationalCode(v : string) {
  //   if(this.interiorIndiviual&&this.interiorIndiviual.personalDetails){
  //     this.interiorIndiviual.personalDetails.nationalCode=v;
  //   }
  //   this._nationalCode = v;
  // }

  // public interiorIndiviual?:InteriorIndividualRequest ;

}
