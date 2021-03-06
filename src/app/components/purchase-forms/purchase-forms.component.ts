import {Component, Input, OnInit} from '@angular/core';
import {PurchaseOrder} from '../../models/purchase-order';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PurchaseOrderService} from '../../services/purchase-order.service';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {ProviderService} from '../../services/provider.service';
import {ProviderCompany} from '../../models/company';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DeliveryService} from '../../services/delivery.service';
import {GenericDialogComponent} from './dialogues/generic-dialog/generic-dialog.component';
import {Router} from '@angular/router';
import {StepperService} from '../../services/stepper.service';

@Component({
  selector: 'app-purchase-forms',
  templateUrl: './purchase-forms.component.html',
  styleUrls: ['./purchase-forms.component.css']
})
export class PurchaseFormsComponent implements OnInit {

  // orden de compra
  @Input() purchase: PurchaseOrder;
  // lista de productos y proveedores
  products: Product[];
  providers: ProviderCompany[];
  // forms
  purchaseForm: FormGroup;
  portForm: FormGroup;
  plantForm: FormGroup;
  containerDownloadForm: FormGroup;
  blockDownloadForm: FormGroup;
  inspectionForm: FormGroup;
  giveBackForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private purchaseOrderService: PurchaseOrderService,
              private productService: ProductService,
              private providerService: ProviderService,
              private deliveryService: DeliveryService,
              public router: Router,
              public alertRef: MatSnackBar,
              private stepper: StepperService,
              public dialog: MatDialog) {
  }

  getStepNumber(purchaseOrder: PurchaseOrder) {
    return this.stepper.getStepNumber(purchaseOrder);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(p => {
      if (JSON.stringify(p).length === 0) {
        this.router.navigate(['ordenes']);
      }
      this.products = p;
    });
    this.providerService.getProviders().subscribe(p => this.providers = p);
    this.purchaseForm = this.formBuilder.group({
      product: ['', Validators.required],
      quantityInTons: ['', Validators.required],
      provider: ['', Validators.required]
    });
    this.portForm = this.formBuilder.group({
      container: ['', [Validators.required, Validators.pattern('[A-Z]{4}[0-9]{7}')]],
      licensePlate: ['', [Validators.required, Validators.max(30)]],
      driverFullName: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.plantForm = this.formBuilder.group( {
      arrivalToPlant: ['', [Validators.required, this.validateArrivalToPlant]]
    });
    this.containerDownloadForm = this.formBuilder.group({
      containerDischargeEnd: ['', Validators.required],
      containerDischargeStart: ['', Validators.required],
    }, { validator: this.checkIfEndDateAfterStartDateCont });
    this.blockDownloadForm = this.formBuilder.group({
      blockDischargeEnd: ['', Validators.required],
      blockDischargeStart: ['', Validators.required]
    }, { validator: this.checkIfEndDateAfterStartDateBlock });
    this.inspectionForm = this.formBuilder.group({
      damageFine: ['', Validators.required]
    });
    this.giveBackForm = this.formBuilder.group({
      lateReturnFine: ['', Validators.required]
    });
  }

  validateArrivalToPlant = (control: FormControl) => {
    const arrivalToPlant = control.value;
    const invalid = new Date(arrivalToPlant).getTime() < this.purchase.date;
    return invalid ? {'arrivalToPlant': true} : null;
  }

  checkIfEndDateAfterStartDateCont = (control: AbstractControl) => {
    const start = control.get('containerDischargeStart').value;
    const end = control.get('containerDischargeEnd').value;
    if (!start || !end) {
      return null;
    }
    const startBeforeOrder = new Date(start).getTime() < this.purchase.date;
    const endBeforeOrder = new Date(end).getTime() < this.purchase.date;
    const endBeforeStart = new Date(end).getTime() < new Date(start).getTime();
    const contBeforeArrival = new Date(start).getTime() < this.purchase.delivery.arrivalToPlant;
    const invalid = startBeforeOrder || endBeforeOrder || endBeforeStart || contBeforeArrival;
    return invalid ? {'invalidDates': true} : null;
  }

  checkIfEndDateAfterStartDateBlock = (control: AbstractControl) => {
    const start = control.get('blockDischargeStart').value;
    const end = control.get('blockDischargeEnd').value;
    if (!start || !end) {
      return null;
    }
    const startBeforeOrder = new Date(start).getTime() < this.purchase.date;
    const endBeforeOrder = new Date(end).getTime() < this.purchase.date;
    const endBeforeStart = new Date(end).getTime() < new Date(start).getTime();
    const blockBeforeCont = new Date(start).getTime() < this.purchase.delivery.containerDischargeEnd;
    const invalid = startBeforeOrder || endBeforeOrder || endBeforeStart || blockBeforeCont;
    return invalid ? {'invalidDates': true} : null;
  }

  purchaseFormDialog() {
    const value = this.purchaseForm.value;
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Confirmar información de orden de compra',
        items: [
          {title: 'Proveedor', value: this.providers.find(p => p.id === value.provider).name},
          {title: 'Producto', value: this.products.find(p => p.id === value.product).name},
          {title: 'Cantidad en toneladas', value: value.quantityInTons}
        ]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.purchaseFormSubmit();
      }
    });
  }

  purchaseFormSubmit() {
    if (this.purchaseForm.valid) {
      const value = this.purchaseForm.value;
      const purchaseToUpdate = this.purchase;
      purchaseToUpdate.quantityInTons = value.quantityInTons;
      purchaseToUpdate.provider = this.providers.find(p => p.id === value.provider);
      purchaseToUpdate.product = this.products.find(p => p.id === value.product);
      this.purchaseOrderService.updatePurchase(purchaseToUpdate).subscribe(result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe(p => {
          this.purchase = p;
          this.onRefresh();
          this.alertRef.open('Se agregó la información de orden de compra al pedido', 'Cerrar');
        });
      });
    }
  }

  portFormDialog() {
    const value = this.portForm.value;
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Confirmar información de llegada a puerto',
        items: [
          {title: 'Código de contenedor', value: value.container},
          {title: 'Patente del camión', value: value.licensePlate},
          {title: 'Nombre completo del conductor', value: value.driverFullName},
        ]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portFormSubmit();
      }
    });
  }

  portFormSubmit() {
    if (this.portForm.valid) {
      const value = this.portForm.value;
      const purchaseToUpdate = this.purchase;
      this.deliveryService.createDelivery().subscribe(delivery => {
        delivery.container = value.container;
        delivery.licensePlate = value.licensePlate;
        delivery.driverFullName = value.driverFullName;
        purchaseToUpdate.delivery = delivery;
        this.deliveryService.editDelivery(delivery).subscribe( d => {
          this.purchaseOrderService.updatePurchase(purchaseToUpdate).subscribe(result => {
            this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe(p => {
              this.purchase = p;
              this.onRefresh();
              this.alertRef.open('Se agregó la información de recepción pedido', 'Cerrar');
            });
          });
        });
      });
    }
  }

  plantFormDialog() {
    const value = this.plantForm.value;
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Confirmar información de llegada a planta',
        items: [
          {title: 'Hora de arribo', value: value.arrivalToPlant}
        ]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.plantFormSubmit();
      }
    });
  }

  plantFormSubmit() {
    if (this.plantForm.valid) {
      const value = this.plantForm.value;
      const deliveryToUpdate = this.purchase.delivery;
      const date = new Date(value.arrivalToPlant);
      deliveryToUpdate.arrivalToPlant = date.getTime();
      this.deliveryService.editDelivery(deliveryToUpdate).subscribe(result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe(p => {
          this.purchase = p;
          this.onRefresh();
          this.alertRef.open('Se agregó la hora de arribo a planta', 'Cerrar');
        });
      });
    }
  }

  containerDownloadFormDialog() {
    if (this.containerDownloadForm.valid) {
      const value = this.containerDownloadForm.value;
      const deliveryToUpdate = this.purchase.delivery;
      const date = new Date(value.containerDischargeStart);
      deliveryToUpdate.containerDischargeStart = date.getTime();
      const date1 = new Date(value.containerDischargeEnd);
      deliveryToUpdate.containerDischargeEnd = date1.getTime();
      this.deliveryService.editDelivery(deliveryToUpdate).subscribe( result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe( p => {
          this.purchase = p;
          this.alertRef.open('Se agregó la hora de descarga del contenedor', 'Cerrar');
        });
      });
    }
  }

  blockDownloadFormDialog() {
    if (this.blockDownloadForm.valid) {
      const value = this.blockDownloadForm.value;
      const deliveryToUpdate = this.purchase.delivery;
      deliveryToUpdate.blockDischargeStart = new Date(value.blockDischargeStart).getTime();
      deliveryToUpdate.blockDischargeEnd = new Date(value.blockDischargeEnd).getTime();
      this.deliveryService.editDelivery(deliveryToUpdate).subscribe( result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe( p => {
          this.purchase = p;
          this.alertRef.open('Se agregó la hora de descarga del bloque', 'Cerrar');
        });
      });
    }
  }

  inspectionFormDialog() {
    if (this.inspectionForm.valid) {
      const value = this.inspectionForm.value;
      const deliveryToUpdate = this.purchase.delivery;
      deliveryToUpdate.damageFine = value.damageFine;
      this.deliveryService.editDelivery(deliveryToUpdate).subscribe( result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe( p => {
          this.purchase = p;
          this.alertRef.open('Se agregó la información de la inspección', 'Cerrar');
        });
      });
    }
  }

  giveBackFormDialog() {
    if (this.giveBackForm.valid) {
      const value = this.giveBackForm.value;
      const deliveryToUpdate = this.purchase.delivery;
      deliveryToUpdate.lateReturnFine = value.lateReturnFine;
      this.deliveryService.editDelivery(deliveryToUpdate).subscribe( result => {
        this.purchaseOrderService.getPurchaseById(this.purchase.id).subscribe( p => {
          this.purchase = p;
          this.alertRef.open('Se agregó la información de la devolución', 'Cerrar');
        });
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
        this.router.navigate([this.router.url]).then(x => console.log('refresh'));
      });
  }
}

export class DateValidators {
  static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const date1 = c.get(dateField1).value;
      const date2 = c.get(dateField2).value;
      if ((date1 !== null && date2 !== null) && date1 > date2) {
        return validatorField;
      }
      return null;
    };
  }
}
