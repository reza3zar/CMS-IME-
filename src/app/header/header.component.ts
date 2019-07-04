import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // this.wishListService.addEvent.subscribe(result => {
    //   this.wishListCount += result;
    // });
    //
    // this.shoppingCartService.addEvent.subscribe(result => {
    //   this.shoppingCartCount += result;
    // });
    //
    // this.userInfoService.loginEvent.subscribe(result => {
    //   if (result)
    //     this.userInfo = result;
    //   else
    //     this.userInfo = null;
    // });


  }


}
