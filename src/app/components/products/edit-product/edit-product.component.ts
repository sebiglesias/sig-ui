import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  product: Product;
  editForm: FormGroup;
  validationMessages: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.validationMessages = validationMessages;
    const productId = localStorage.getItem('editProductId');
    if (!productId) {
      alert('Invalid action.');
      this.router.navigate(['list-product']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      productType: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.productService.getProductById(+productId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.productService.updateProduct(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-product']);
        },
        error => {
          alert(error);
        });
  }
}
