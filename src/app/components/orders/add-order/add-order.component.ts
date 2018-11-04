import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {ProductService} from '../../../services/product.service';
import {CompanyService} from '../../../services/company.service';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';
import {BillOfLoading} from '../../../models/bill-of-loading';
import {Company} from '../../../models/company';
import {Product} from '../../../models/product';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private productService: ProductService,
              private companyService: CompanyService) { }

  addForm: FormGroup;
  products: Product[] = [];
  companies: Company[] = [];
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.productService.getAllProducts().subscribe( prods => this.products = prods);
    this.companyService.getAllCompanies().subscribe( prods => this.companies = prods);

    this.addForm = this.formBuilder.group({
      id: [],
      product: ['', Validators.required],
      date: ['', Validators.required],
      company: ['', Validators.required],
    });

  }

  onSubmit() {
    const order = this.addForm.value;
    this.productService.getProductById(order.product).subscribe(product => {
      this.companyService.getCompanyById(order.company).subscribe(company => {
        this.orderService.createOrder(order, product, company);
      });
    });
  }

  goToBillOfLoading() {
    this.router.navigate(['add-bill-of-loading']);
  }

  goToCompany() {
    this.router.navigate(['add-company']);
  }

  goToProduct() {
    this.router.navigate(['add-product']);
  }
}
