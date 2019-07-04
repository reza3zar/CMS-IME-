import { IdentityType } from "../Common/identityType";

export class IdentityDetails{


  private _id : number;
  public get id() : number {
    return this._id;
  }
  public set id(v : number) {
    this._id = v;
  }



  // private _code : string;
  // public get code() : string {
  //   return this._code;
  // }
  // public set code(v : string) {
  //   this._code = v;
  // }

  public code:string;


  private _identityType : IdentityType;
  public get identityType() : IdentityType {
    return this._identityType;
  }
  public set identityType(v : IdentityType) {
    this._identityType = v;
  }

}
