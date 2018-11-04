import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {validationMessages} from '../../../models/validationMessages';
import {ProductType} from '../../../models/product';
import {ProductTypeService} from '../../../services/product-type.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addForm: FormGroup;
  validationMessages: any;
  productTypes: ProductType[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private productTypeService: ProductTypeService) {
    this.productTypeService.getAllProductTypes().subscribe(prods => {
      this.productTypes = prods;
    });
  }

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      productType: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addForm.dirty && this.addForm.valid) {
      this.productTypeService.getProductTypeById(this.addForm.value.productType).subscribe( pType => {
        this.productService.createProduct(this.addForm.value, pType);
      });
    }
  }

  goToTypeProductView() {
    this.router.navigate(['add-product-type']);
  }
}
