import { Education } from "../Common/Education";

export class workingDetails{

  private _jobTitle : string;
  public get jobTitle() : string {
    return this._jobTitle;
  }
  public set jobTitle(v : string) {
    this._jobTitle = v;
  }


  private _jobDate : string;
  public get jobDate() : string {
    return this._jobDate;
  }
  public set jobDate(v : string) {
    this._jobDate = v;
  }


  private _companyName : string;
  public get companyName() : string {
    return this._companyName;
  }
  public set companyName(v : string) {
    this._companyName = v;
  }



  private _position : string;
  public get position() : string {
    return this._position;
  }
  public set position(v : string) {
    this._position = v;
  }



  private _educationLevel : Education;
  public get educationLevel() : Education {
    return this._educationLevel;
  }
  public set educationLevel(v : Education) {
    this._educationLevel = v;
  }

}
