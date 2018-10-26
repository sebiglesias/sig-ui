import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContainerService} from '../../../services/container.service';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-container',
  templateUrl: './add-container.component.html',
  styleUrls: ['./add-container.component.css']
})
export class AddContainerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private containerService: ContainerService,
              private productService: ProductService) { }

  addForm: FormGroup;
  products: Product[];
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.productService.getAllProducts().subscribe( prods => this.products = prods);

    this.addForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      product: ['', Validators.required],
      footSize: ['', Validators.required],
    });
  }

  onSubmit() {
    const container = this.addForm.value;
    const productById = this.productService.getProductById(Number(container.product));
    productById.subscribe(prod => {
      container.product = prod;
      this.containerService.createContainer(container)
        .subscribe( data => {
          this.router.navigate(['list-container']);
        });
    });
  }

}
