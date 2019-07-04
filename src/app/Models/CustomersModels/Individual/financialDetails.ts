import Market from "../Common/market";

export class FinancialDetails{


private _ownerShipValue : string;
public get ownerShipValue() : string {
  return this._ownerShipValue;
}
public set ownerShipValue(v : string) {
  this._ownerShipValue = v;
}


private _averageSalaryPermonth : string;
public get averageSalaryPermonths() : string {
  return this._averageSalaryPermonth;
}
public set averageSalaryPermonths(v : string) {
  this._averageSalaryPermonth = v;
}


private _markets : Array<Market>
public get markets() : Array<Market> {
  return this._markets;
}
public set markets(v : Array<Market>) {
  this._markets = v;
}


private _isAuctionMarket : boolean;
public get isAuctionMarket() : boolean {
  return this._isAuctionMarket;
}
public set isAuctionMarket(v : boolean) {
  this._isAuctionMarket = v;
}


private _isFutureMarket : boolean;
public get isFutureMarket() : boolean {
  return this._isFutureMarket;
}
public set isFutureMarket(v : boolean) {
  this._isFutureMarket = v;
}




private _predictContractValueINAuctionMarket : string;
public get predictContractValueINAuctionMarket() : string {
  return this._predictContractValueINAuctionMarket;
}
public set predictContractValueINAuctionMarket(v : string) {
  this._predictContractValueINAuctionMarket = v;
}


private _predictContractValueINFutureMarket : string;
public get predictContractValueINFutureMarket() : string {
  return this._predictContractValueINFutureMarket;
}
public set predictContractValueINFutureMarket(v : string) {
  this._predictContractValueINFutureMarket = v;
}



}
