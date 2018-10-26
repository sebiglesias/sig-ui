import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  addForm: FormGroup;
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      productType: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.addForm.dirty && this.addForm.valid) {
      this.productService.createProduct(this.addForm.value).subscribe(data => this.router.navigate(['list-product']));
    }
  }
}
