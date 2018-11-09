import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  editForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private router: Router,
              public alertRef: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ProductDialogComponent>) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.editForm.setValue({ id: this.data.id, name: this.data.name });
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    if (this.editForm.valid) {
      this.productService.editProduct(this.editForm.value.id, this.editForm.value.name).subscribe(x => {
        this.onRefresh();
      });
    }
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    const currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]).then(y => this.alertRef.open('Se editó el producto'));
      });
  }
}
