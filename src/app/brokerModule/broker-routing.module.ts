import { RequestsComponent } from './requestsManagement/requests/requests.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HomeLayoutComponent } from '../CommonModule/home-layout/home-layout.component';


const routes: Routes = [


  {
    path: "",
    component: HomeLayoutComponent,
    children: [ {path: '', component:  RequestsComponent},
    {path: 'request', component:  RequestsComponent}]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]

})
export class BrokerRoutingModule {
}
