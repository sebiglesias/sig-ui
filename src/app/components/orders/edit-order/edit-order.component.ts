import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Order} from '../../../models/order';
import {Company} from '../../../models/company';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {CompanyService} from '../../../services/company.service';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';
import {OrderService} from '../../../services/order.service';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order;
  editForm: FormGroup;
  products: Product[];
  companies: Company[];
  validationMessages: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private companyService: CompanyService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.productService.getAllProducts().subscribe(prods => this.products = prods);
    this.companyService.getAllCompanies().subscribe(prods => this.companies = prods);
    const orderId = localStorage.getItem('editOrderId');
    if (!orderId) {
      alert('Invalid action.');
      this.router.navigate(['list-order']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      product: ['', Validators.required],
      date: ['', Validators.required],
      company: ['', Validators.required],
    });
    this.orderService.getOrderById(Number(orderId))
      .subscribe(data => {
        const truckData = {
          id: data.id,
          product: data.product.id,
          date: data.date,
          company: data.company.id,
        };
        this.editForm.setValue(truckData);
      });
  }

  onSubmit() {
    this.productService.getProductById(this.editForm.value.product).subscribe(prod => {
      this.companyService.getCompanyById(this.editForm.value.company).subscribe(comp => {
        this.orderService.updateOrder(this.editForm.value, prod, comp)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['list-order']);
            },
            error => {
              alert(error);
            });
      });
    });
  }
}
