import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProviderService} from '../../services/provider.service';

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['./provider-dialog.component.css']
})
export class ProviderDialogComponent implements OnInit {

  editForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private providerService: ProviderService,
              private router: Router,
              public alertRef: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ProviderDialogComponent>) { }

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
      this.providerService.editProvider(this.editForm.value.id, this.editForm.value.name).subscribe(x => {
        this.close();
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
        this.router.navigate([this.router.url]).then(y => this.alertRef.open('Se editó el proveedor', 'Cerrar'));
      });
  }
}
