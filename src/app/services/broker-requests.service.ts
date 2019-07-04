import { brokerRequest } from './../Models/CustomersModels/Common/brokerRequest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AppUrl } from '../app-url';

@Injectable({
  providedIn: 'root'
})
export class BrokerRequestsService {

  private url = AppUrl;
  constructor(private http: HttpClient) { }


  public getBrokerRequests(): Observable<Array< brokerRequest>>{
   return this.http.get<Array<brokerRequest>>(this.url.brokerRequests);
  }

  public chekIsExistExternalId(externalId):Observable<any>{
    return this.http.get(this.url.chekIsExistExternalId+'/'+externalId);
  }

}
