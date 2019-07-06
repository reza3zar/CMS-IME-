

import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SlideService } from "./services";
import { InActiveBackgroundService } from "./in-active-background.service";

 


const routes: Routes = [
  {
    path: "customers",
    loadChildren: "./customers/customers.module#CustomersModule"
  },
  {
    path: "orders",
    loadChildren: "./orders/orders.module#OrdersModule"
  },

  {
    path: "home",
    loadChildren: "./home/home.module#HomeModule"
  },
  {
    path: "exchange",
    loadChildren: "./exchange-module/exchange-module.module#ExchangeModuleModule"
  },
  {
    path: "broker",
    loadChildren: "./brokerModule/broker.module#BrokerModule"
  },
  {
    path: "",

    redirectTo: "home",
    pathMatch: "full"
  },


  { path: 'login', component: LoginLayoutComponent,children: [{ path: "", component: LoginComponent }] }

  ];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  declarations: [],
  exports: [RouterModule],
  providers: [SlideService, InActiveBackgroundService]
})
export class AppRoutingModule {}
