import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { EditOrderComponent } from './components/orders/edit-order/edit-order.component';
import { ListOrderComponent } from './components/orders/list-order/list-order.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {OrderService} from './services/order.service';
import {ShipmentReportService} from './services/shipment-report.service';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import {ProductService} from './services/product.service';

const routes: Routes = [
  {path: 'list-order', component: ListOrderComponent},
  {path: 'add-order', component: AddOrderComponent},
  {path: 'edit-order', component: EditOrderComponent},
  {path: 'list-product', component: ListProductComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product', component: EditProductComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    OrderService,
    ShipmentReportService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
