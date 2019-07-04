import { Component, OnInit, Input } from '@angular/core';
import { CustomControl } from '../../control-builder/Common/control';
import { OperationBar } from '../../control-builder/Common/operationBar';

@Component({
  selector: 'app-show-result-info',
  templateUrl: './show-result-info.component.html',
  styleUrls: ['./show-result-info.component.css']
})
export class ShowResultInfoComponent implements OnInit {
  public operationBar: OperationBar = new OperationBar();

  @Input() collection:  Array< CustomControl> =new Array< CustomControl>() ;

  constructor() { }

  ngOnInit() {
    this.operationBar.showOperationBar = this.operationBar.showSuccessBtn = this.operationBar.showCancelBtn = false;
    this.operationBar.successBtnTitle = "استعلام جدید";
    this.operationBar.cancelBtnTitle = "خروج";
  }

}
