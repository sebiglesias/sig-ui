import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-purchase-progress-bar',
  templateUrl: './purchase-progress-bar.component.html',
  styleUrls: ['./purchase-progress-bar.component.css']
})
export class PurchaseProgressBarComponent implements OnInit {

  @Input() step;
  constructor() { }

  ngOnInit() {
  }

}
