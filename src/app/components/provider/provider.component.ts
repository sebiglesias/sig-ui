import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../models/product';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProviderService} from '../../services/provider.service';
import {ProviderCompany} from '../../models/company';
import {ProviderDialogComponent} from '../provider-dialog/provider-dialog.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, AfterViewInit {

  providers: ProviderCompany[];
  dataSource = new MatTableDataSource(this.providers);
  @ViewChild(MatSort) sort: MatSort;
  addForm: FormGroup;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private alertRef: MatSnackBar,
              private router: Router,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providerService.getProviders().subscribe(list => {
      this.providers = list;
      this.dataSource = new MatTableDataSource(this.providers);
    });
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openEditDialog(prod: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = prod;
    dialogConfig.height = '200px';
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(ProviderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createProvider() {
    if (this.addForm.valid) {
      this.providerService.createNewProvider(this.addForm.value.name).subscribe( x => {
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
        this.router.navigate([this.router.url]).then(y => this.alertRef.open('Se creó el proveedor'));
      });
  }
}
