import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductTypeService} from '../../../../services/product-type.service';
import {Router} from '@angular/router';
import {validationMessages} from '../../../../models/validationMessages';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productTypeService: ProductTypeService) { }

  addForm: FormGroup;
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      material: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    if (this.addForm.dirty && this.addForm.valid) {
      this.productTypeService.createProductType(this.addForm.value).subscribe(data => this.router.navigate(['list-product-type']));
    }
  }
}
