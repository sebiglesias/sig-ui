import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Container} from '../../../models/container';
import {ContainerService} from '../../../services/container.service';
import {BillOfLoading} from '../../../models/bill-of-loading';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company.service';
import {BillOfLoadingService} from '../../../services/bill-of-loading.service';

@Component({
  selector: 'app-edit-bill-of-loading',
  templateUrl: './edit-bill-of-loading.component.html',
  styleUrls: ['./edit-bill-of-loading.component.css']
})
export class EditBillOfLoadingComponent implements OnInit {

  editForm: FormGroup;
  containers: Container[];
  companies: Company[];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private containerService: ContainerService,
              private companyService: CompanyService,
              private billOfLoadingService: BillOfLoadingService) { }

  ngOnInit() {
    this.containerService.getAllContainers().subscribe(prods => this.containers = prods);
    this.companyService.getAllCompanies().subscribe(prods => this.companies = prods);
    const billOfLoadingId = localStorage.getItem('editBillOfLoadingId');
    if (!billOfLoadingId) {
      alert('Invalid action.');
      this.router.navigate(['list-bill-of-loading']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      date: ['', Validators.required],
      container: ['', Validators.required],
      company: ['', Validators.required],
    });
    this.billOfLoadingService.getBillOfLoadingById(billOfLoadingId)
      .subscribe( data => {
        const truckData = {
          id: data.id,
          date: data.date,
          container: data.container.id,
          company: data.company.id
        };
        this.editForm.setValue(truckData);
      });
  }

  onSubmit() {
    this.billOfLoadingService.updateBillOfLoading(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-bill-of-loading']);
        },
        error => {
          alert(error);
        });
  }
}
