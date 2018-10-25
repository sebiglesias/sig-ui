import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    const orderId = localStorage.getItem('editOrderId');
    if (!orderId) {
      alert('Invalid action.');
      this.router.navigate(['list-order']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.orderService.getOrderById(+orderId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.orderService.updateOrder(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-order']);
        },
        error => {
          alert(error);
        });
  }

}
