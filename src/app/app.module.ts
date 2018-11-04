import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AddOrderComponent} from './components/orders/add-order/add-order.component';
import {EditOrderComponent} from './components/orders/edit-order/edit-order.component';
import {ListOrderComponent} from './components/orders/list-order/list-order.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {OrderService} from './services/order.service';
import {ShipmentReportService} from './services/shipment-report.service';
import {AddProductComponent} from './components/products/add-product/add-product.component';
import {ListProductComponent} from './components/products/list-product/list-product.component';
import {EditProductComponent} from './components/products/edit-product/edit-product.component';
import {ProductService} from './services/product.service';
import {AddCompanyComponent} from './components/companies/add-company/add-company.component';
import {EditCompanyComponent} from './components/companies/edit-company/edit-company.component';
import {ListCompanyComponent} from './components/companies/list-company/list-company.component';
import {AddContainerComponent} from './components/containers/add-container/add-container.component';
import {EditContainerComponent} from './components/containers/edit-container/edit-container.component';
import {ListContainerComponent} from './components/containers/list-container/list-container.component';
import {CompanyService} from './services/company.service';
import {ContainerService} from './services/container.service';
import {AddTruckComponent} from './components/trucks/add-truck/add-truck.component';
import {EditTruckComponent} from './components/trucks/edit-truck/edit-truck.component';
import {ListTruckComponent} from './components/trucks/list-truck/list-truck.component';
import {TruckService} from './services/truck.service';
import {AddBillOfLoadingComponent} from './components/billOfLoadings/add-bill-of-loading/add-bill-of-loading.component';
import {EditBillOfLoadingComponent} from './components/billOfLoadings/edit-bill-of-loading/edit-bill-of-loading.component';
import {ListBillOfLoadingComponent} from './components/billOfLoadings/list-bill-of-loading/list-bill-of-loading.component';
import {BillOfLoadingService} from './services/bill-of-loading.service';
import {AddShipmentComponent} from './components/shipments/add-shipment/add-shipment.component';
import {EditShipmentComponent} from './components/shipments/edit-shipment/edit-shipment.component';
import {ListShipmentComponent} from './components/shipments/list-shipment/list-shipment.component';
import {ShipmentService} from './services/shipment.service';
import {AddShipmentReportComponent} from './components/shipmentReports/add-shipment-report/add-shipment-report.component';
import {EditShipmentReportComponent} from './components/shipmentReports/edit-shipment-report/edit-shipment-report.component';
import {ListShipmentReportComponent} from './components/shipmentReports/list-shipment-report/list-shipment-report.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeComponent} from './components/home/home.component';
import {ViewShipmentComponent} from './components/shipments/view-shipment-report/view-shipment.component';
import {AddProductTypeComponent} from './components/products/product-type/add-product-type/add-product-type.component';
import {EditProductTypeComponent} from './components/products/product-type/edit-product-type/edit-product-type.component';
import {ListProductTypeComponent} from './components/products/product-type/list-product-type/list-product-type.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductTypeService} from './services/product-type.service';
import {FineService} from './services/fine.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list-order', component: ListOrderComponent},
  {path: 'add-order', component: AddOrderComponent},
  {path: 'edit-order', component: EditOrderComponent},
  {path: 'list-product-type', component: ListProductTypeComponent},
  {path: 'add-product-type', component: AddProductTypeComponent},
  {path: 'edit-product-type', component: EditProductTypeComponent},
  {path: 'list-product', component: ListProductComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product', component: EditProductComponent},
  {path: 'list-company', component: ListCompanyComponent},
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'edit-company', component: EditCompanyComponent},
  {path: 'list-container', component: ListContainerComponent},
  {path: 'add-container', component: AddContainerComponent},
  {path: 'edit-container', component: EditContainerComponent},
  {path: 'list-truck', component: ListTruckComponent},
  {path: 'add-truck', component: AddTruckComponent},
  {path: 'edit-truck', component: EditTruckComponent},
  {path: 'list-bill-of-loading', component: ListBillOfLoadingComponent},
  {path: 'add-bill-of-loading', component: AddBillOfLoadingComponent},
  {path: 'edit-bill-of-loading', component: EditBillOfLoadingComponent},
  {path: 'list-companies', component: ListCompanyComponent},
  {path: 'add-companies', component: AddCompanyComponent},
  {path: 'edit-companies', component: EditCompanyComponent},
  {path: 'list-shipment', component: ListShipmentComponent},
  {path: 'add-shipment', component: AddShipmentComponent},
  {path: 'edit-shipment', component: EditShipmentComponent},
  {path: 'view-shipment/:id', component: ViewShipmentComponent},
  {path: 'list-shipment-report', component: ListShipmentReportComponent},
  {path: 'add-shipment-report', component: AddShipmentReportComponent},
  {path: 'edit-shipment-report', component: EditShipmentReportComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    ListCompanyComponent,
    AddContainerComponent,
    EditContainerComponent,
    ListContainerComponent,
    AddTruckComponent,
    EditTruckComponent,
    ListTruckComponent,
    AddBillOfLoadingComponent,
    EditBillOfLoadingComponent,
    ListBillOfLoadingComponent,
    AddShipmentComponent,
    EditShipmentComponent,
    ListShipmentComponent,
    AddShipmentReportComponent,
    EditShipmentReportComponent,
    ListShipmentReportComponent,
    NavBarComponent,
    HomeComponent,
    ViewShipmentComponent,
    AddProductTypeComponent,
    EditProductTypeComponent,
    ListProductTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OrderService,
    ShipmentReportService,
    ProductTypeService,
    ProductService,
    CompanyService,
    ContainerService,
    TruckService,
    BillOfLoadingService,
    ShipmentService,
    ShipmentReportService,
    FineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
