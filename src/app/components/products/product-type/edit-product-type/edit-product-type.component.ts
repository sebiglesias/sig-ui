import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ProductTypeService} from '../../../../services/product-type.service';
import {validationMessages} from '../../../../models/validationMessages';
import {ProductType} from '../../../../models/product';

@Component({
  selector: 'app-edit-product-type',
  templateUrl: './edit-product-type.component.html',
  styleUrls: ['./edit-product-type.component.css']
})

export class EditProductTypeComponent implements OnInit {

  productType: ProductType;
  editForm: FormGroup;
  validationMessages: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private productTypeService: ProductTypeService) { }

  ngOnInit() {
    this.validationMessages = validationMessages;
    const productId = localStorage.getItem('editProductTypeId');
    if (!productId) {
      alert('Invalid action.');
      this.router.navigate(['list-product-type']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      material: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.productTypeService.getProductTypeById(+productId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.productTypeService.updateProductType(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-product-type']);
        },
        error => {
          alert(error);
        });
  }
}
