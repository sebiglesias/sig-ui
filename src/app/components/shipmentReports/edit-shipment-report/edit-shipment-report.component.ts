import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ShipmentReport} from '../../../models/shipment-report';
import {Company} from '../../../models/company';
import {ShipmentReportService} from '../../../services/shipment-report.service';
import {CompanyService} from '../../../services/company.service';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-edit-shipment-report',
  templateUrl: './edit-shipment-report.component.html',
  styleUrls: ['./edit-shipment-report.component.css']
})
export class EditShipmentReportComponent implements OnInit {

  editForm: FormGroup;
  navyCompanies: Company[];
  providers: Company[];
  validationMessages: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private shipmentReportService: ShipmentReportService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.companyService.getAllCompanies().subscribe(comps => {
      this.navyCompanies = comps;
      this.providers = comps;
    });
    const shipmentId = localStorage.getItem('editShipmentReportId');
    if (!shipmentId) {
      alert('Invalid action.');
      this.router.navigate(['list-shipment-report']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      date: ['', Validators.required],
      terminal: ['', Validators.required],
      port: ['', Validators.required],
      navyCompany: ['', Validators.required],
      provider: ['', Validators.required],
      loadingPoint: ['', Validators.required],
      dockingPoint: ['', Validators.required],
      boat: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
    });
    this.shipmentReportService.getShipmentReportById(Number(shipmentId))
      .subscribe((data: ShipmentReport) => {
        const shipmentData = {
          id: data.id,
          date: data.introduced,
          terminal: data.terminal,
          port: data.port,
          navyCompany: data.navyCompany.id,
          provider: data.provider.id,
          loadingPoint: data.loadingPoint,
          dockingPoint: data.dockingPoint,
          boat: data.boat,
          deliveryPlace: data.deliveryPlace,
        };
        this.editForm.setValue(shipmentData);
      });
  }

  onSubmit() {
    this.companyService.getCompanyById(this.editForm.value.navyCompany).subscribe(navyCompany => {
      this.companyService.getCompanyById(this.editForm.value.provider).subscribe(provider => {
        this.shipmentReportService.updateShipmentReport(this.editForm.value, navyCompany, provider)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['list-shipment-report']);
            },
            error => {
              alert(error);
            });
      });
    });
  }
}
