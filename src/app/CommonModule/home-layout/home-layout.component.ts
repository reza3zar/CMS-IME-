import { LoginServiceService } from './../../services/login-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { User } from '../../Models/User/User';
import { state, trigger, style } from '@angular/animations';
declare var $ :any;

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0px)'

      })),
      state('out', style({
        transform: 'translateX(250px)'

      })),

    ]),
  ]
})
export class HomeLayoutComponent implements OnInit, OnDestroy{

  public mymenuState: string = 'in';
  showSideBarIcon = false;

  changeStateSideBar(val: boolean){
    this.showSideBarIcon = val;
    if(this.mymenuState==='in')
      this.mymenuState='out';
    else
    this.mymenuState='in'
  }

  ngOnInit(): void {
    this.backGroundSubscriber= this.inActiveServ.change.subscribe(state=>
      {
        this.state=state;
      }
    );


    this.localSubscriber= this.loginService.getUserData().subscribe((user) => {
      this.user=user;
      });

      this.getCategories();
  }

  user:User=new User();
  localSubscriber: Subscription;
  routerSubscriber: Subscription;

  loading:boolean = false;
  progress: boolean = false;
  state:boolean=false;
  constructor(private router: Router,private inActiveServ:InActiveBackgroundService ,private loginService:LoginServiceService
    ,private categoryService: CategoryService  ){
    this.routerSubscriber=  router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.loading = true;
      }else if(event instanceof NavigationEnd) {
        this.loading = false;
      }});
  }
  private isInActive=false;

  backGroundSubscriber:Subscription;

  ngOnDestroy(): void {
    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.routerSubscriber !== undefined) {
      this.routerSubscriber.unsubscribe();
    }

    if (this.categoryubscriber !== undefined) {
      this.categoryubscriber.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progress = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.progress = false;
      }
    }, e => (this.progress = false));
  }

  categories: Category[];

  categoryubscriber:Subscription;
  public menuIsLoad=false;

  getCategories() {
    var dataResult= this.categoryService.categories;
    if( dataResult!==undefined && dataResult.length>0)
    {
      this.categories = dataResult.filter(x=>x.parentId==0) ;
      this.menuIsLoad=true;
      return;
    }

    this.categoryubscriber=  this.categoryService.getCategories().subscribe(result => {
        this.categories = result.filter(x=>x.parentId==0);
        this.menuIsLoad=true;
        this.categoryService.categories=this.categories;
      });
    }


    onNavigate(cat:Category) {
      console.log(cat)
      this.router.navigate(['/'+cat.path]);

    }

}
