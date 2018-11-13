import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../models/product';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {ProductService} from '../../services/product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  products: Product[];
  dataSource = new MatTableDataSource(this.products);
  @ViewChild(MatSort) sort: MatSort;
  addForm: FormGroup;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private alertRef: MatSnackBar,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(list => {
      this.products = list;
      this.dataSource = new MatTableDataSource(this.products);
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
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createProduct() {
    if (this.addForm.valid) {
      this.productService.createNewProduct(this.addForm.value.name).subscribe( x => {
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
        this.router.navigate([this.router.url]).then(y => this.alertRef.open('Se creó el producto', 'Cerrar'));
      });
  }
}
