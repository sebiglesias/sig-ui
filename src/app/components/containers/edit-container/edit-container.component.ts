import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Container} from '../../../models/container';
import {ContainerService} from '../../../services/container.service';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.css']
})
export class EditContainerComponent implements OnInit {

  container: Container;
  editForm: FormGroup;
  products: Product[];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private containerService: ContainerService,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(prods => this.products = prods);
    const containerId = localStorage.getItem('editContainerId');
    if (!containerId) {
      alert('Invalid action.');
      this.router.navigate(['list-container']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      product: ['', Validators.required],
      footSize: ['', Validators.required],
    });
    this.containerService.getContainerById(String(containerId))
      .subscribe( data => {
        const containerData = {
          id: data.id,
          product: data.product.id,
          footSize: data.footSize
        };
        this.editForm.setValue(containerData);
      });
  }

  onSubmit() {
    this.containerService.updateContainer(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-container']);
        },
        error => {
          alert(error);
        });
  }

}
