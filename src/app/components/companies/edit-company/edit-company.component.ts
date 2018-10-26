import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  company: Company;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService) { }

  ngOnInit() {
    const companyId = localStorage.getItem('editCompanyId');
    if (!companyId) {
      alert('Invalid action.');
      this.router.navigate(['list-company']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      companyType: ['', Validators.required],
    });
    this.companyService.getCompanyById(+companyId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.companyService.updateCompany(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-company']);
        },
        error => {
          alert(error);
        });
  }

}
