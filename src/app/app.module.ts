import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {DateService} from './services/date.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PurchaseOrdersListComponent} from './components/purchase-orders-list/purchase-orders-list.component';
import {PurchaseOrderService} from './services/purchase-order.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {ProductComponent} from './components/product/product.component';
import {ProviderComponent} from './components/provider/provider.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {ProductDialogComponent} from './components/product-dialog/product-dialog.component';
import {CreatePurchaseDialogComponent} from './components/create-purchase-dialog/create-purchase-dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ProductService} from 'app/services/product.service';
import {ProviderService} from 'app/services/provider.service';
import {ProviderDialogComponent} from './components/provider-dialog/provider-dialog.component';
import {PurchaseViewComponent} from './components/purchase-view/purchase-view.component';
import {PurchaseProgressBarComponent} from './components/purchase-progress-bar/purchase-progress-bar.component';
import {PurchaseInfoComponent} from './components/purchase-info/purchase-info.component';
import {PurchaseFormsComponent} from './components/purchase-forms/purchase-forms.component';
import {MatSelectModule} from '@angular/material/select';
import {GenericDialogComponent} from './components/purchase-forms/dialogues/generic-dialog/generic-dialog.component';
import {DeliveryService} from './services/delivery.service';
import {MatRadioModule} from '@angular/material/radio';
import {StepperService} from './services/stepper.service';
import {MatChipsModule} from '@angular/material/chips';

const routes: Routes = [
  {path: '', component: PurchaseOrdersListComponent},
  {path: 'ordenes/:id', component: PurchaseViewComponent},
  {path: 'productos', component: ProductComponent},
  {path: 'proveedores', component: ProviderComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrdersListComponent,
    NavBarComponent,
    ProductComponent,
    ProviderComponent,
    ProductDialogComponent,
    CreatePurchaseDialogComponent,
    ProviderDialogComponent,
    PurchaseViewComponent,
    PurchaseProgressBarComponent,
    PurchaseInfoComponent,
    PurchaseFormsComponent,
    GenericDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
  ],
  providers: [
    PurchaseOrderService,
    DateService,
    MatSnackBar,
    ProductService,
    ProviderService,
    DeliveryService,
    StepperService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductDialogComponent,
    ProviderDialogComponent,
    CreatePurchaseDialogComponent,
    GenericDialogComponent,
  ]
})
export class AppModule {
}
