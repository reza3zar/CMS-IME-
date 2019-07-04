import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { LoginInfo } from '../Models/User/LoginInfo';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,AfterContentInit, OnDestroy {
  form: FormGroup;
  imgeData:string='';
  constructor(private loginservice:LoginServiceService,private cookieService: CookieService,private router: Router,private notificationService: NotificationService) { }
  ngOnInit() {
    this.form=new FormGroup({    userName: new FormControl(''),
    password: new FormControl(''),hash: new FormControl(''),});

    this.refreshCaptcha();


  }
  ngAfterContentInit() {

  }

  refreshCaptcha(){
    this.loginservice.getCaptcha().subscribe(result=>{
      this.imgeData=result.image;
      this.loginInformation.captchaHash=result.hash;
    });
  }

  public loginInformation:LoginInfo=new LoginInfo();

  public loginToSystem(){
    // this.loginservice.login(this.loginInformation).subscribe((response)=>{
      this.localSubscriber=  this.loginservice.login(this.loginInformation).subscribe(data=>{
        if(data==true)
        {
          this.router.navigate(['home']);
        }
        else{
          this.refreshCaptcha();
          this.showErrorLogin();
        }
      }) ;
  }

  localSubscriber:Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }

  public showErrorLogin(err?: any): void {
    //   type: 'slide', duration: 400
    console.log(err);
    this.notificationService.show({
      content:
        "اطلاعات وارد شده، صحیح نمی باشد، دوباره سعی کنید! "

        ,
      animation: { type: "fade", duration: 4000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error", icon: true },
      closable: false
    });
  }



  }


