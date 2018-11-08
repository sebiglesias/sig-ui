import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {DateService} from './date.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PurchaseOrdersListComponent } from './components/purchase-orders-list/purchase-orders-list.component';
import {PurchaseOrderService} from './services/purchase-order.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: PurchaseOrdersListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrdersListComponent,
    NavBarComponent,
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
    MatIconModule
  ],
  providers: [
    PurchaseOrderService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
