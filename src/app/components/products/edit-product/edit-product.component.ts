import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product, ProductType} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {validationMessages} from '../../../models/validationMessages';
import {ProductTypeService} from '../../../services/product-type.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {

  product: Product;
  editForm: FormGroup;
  validationMessages: any;
  productTypes: ProductType[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private productTypeService: ProductTypeService) {
    this.productTypeService.getAllProductTypes().subscribe(prodTypes => this.productTypes = prodTypes);
  }

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
      productType: ['', [Validators.required]],
    });
    this.productService.getProductById(+productId)
      .subscribe(data => {
        const editData = {
          id: data.id,
          name: data.name,
          productType: data.productType.id,
        };
        this.editForm.setValue(editData);
      });
  }

  onSubmit() {
    this.productTypeService.getProductTypeById(this.editForm.value.productType).subscribe(prodType => {
      this.productService.updateProduct(this.editForm.value, prodType).subscribe(x => {
        this.router.navigate(['list-product']);
      });
    });
  }
}
