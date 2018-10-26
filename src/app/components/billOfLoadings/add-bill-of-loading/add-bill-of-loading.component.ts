import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContainerService} from '../../../services/container.service';
import {Container} from '../../../models/container';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';

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
  containers: Container[];
  companies: Company[];

  ngOnInit() {

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
    containerById.subscribe(prod => {
      billOfLoading.container = prod;
      companyById.subscribe( comp => {
        billOfLoading.company = comp;
        this.billOfLoadingService.createBillOfLoading(billOfLoading)
          .subscribe( data => {
            this.router.navigate(['list-bill-of-loading']);
          });
      });
    });
  }

}
