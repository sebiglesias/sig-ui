import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company.service';
import {ShipmentReportService} from '../../../services/shipment-report.service';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-shipment-report',
  templateUrl: './add-shipment-report.component.html',
  styleUrls: ['./add-shipment-report.component.css']
})
export class AddShipmentReportComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private companyService: CompanyService,
              private shipmentReportService: ShipmentReportService) { }

  addForm: FormGroup;
  navyCompanies: Company[] = [];
  providers: Company[] = [];
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.companyService.getAllCompanies().subscribe( comps => {
      this.navyCompanies = this.providers = comps;
    });

    this.addForm = this.formBuilder.group({
      id: [],
      introduced: ['', Validators.required],
      terminal: ['', Validators.required],
      port: ['', Validators.required],
      navyCompany: ['', Validators.required],
      provider: ['', Validators.required],
      loadingPoint: ['', Validators.required],
      dockingPoint: ['', Validators.required],
      boat: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
    });

  }

  onSubmit() {
    const shipmentReport = this.addForm.value;
    this.companyService.getCompanyById(shipmentReport.navyCompany).subscribe(ord => {
      this.companyService.getCompanyById(shipmentReport.provider).subscribe( truck => {
        shipmentReport.introduced = new Date(shipmentReport.introduced).getTime();
          this.shipmentReportService.createShipmentReport(shipmentReport, ord, truck);
        }
      );
    });
  }

  goToCompany() {
    this.router.navigate(['add-company']);
  }
}
