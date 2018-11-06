import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContainerService} from '../../../services/container.service';
import {Container} from '../../../models/container';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-bill-of-loading',
  templateUrl: './add-bill-of-loading.component.html',
  styleUrls: ['./add-bill-of-loading.component.css']
})
export class AddBillOfLoadingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private billOfLoadingService: BillOfLoadingService,
              private containerService: ContainerService,
              private companyService: CompanyService) { }

  addForm: FormGroup;
  containers: Container[] = [];
  companies: Company[] = [];
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.containerService.getAllContainers().subscribe( prods => this.containers = prods);
    this.companyService.getAllCompanies().subscribe( prods => this.companies = prods);

    this.addForm = this.formBuilder.group({
      id: [],
      container: ['', Validators.required],
      date: ['', Validators.required],
      company: ['', Validators.required],
    });

  }

  onSubmit() {
    const billOfLoading = this.addForm.value;
    const containerById = this.containerService.getContainerById(billOfLoading.container);
    const companyById = this.companyService.getCompanyById(billOfLoading.company);
    containerById.subscribe(cont => {
      companyById.subscribe( comp => {
        billOfLoading.date = new Date(billOfLoading.date).getTime();
        this.billOfLoadingService.createBillOfLoading(billOfLoading, cont, comp);
      });
    });
  }

  goToCompany() {
    this.router.navigate(['add-company']);
  }

  goToContainer() {
    this.router.navigate(['add-container']);
  }
}
