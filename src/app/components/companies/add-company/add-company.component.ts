import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      address: ['', Validators.required],
    });

  }

  onSubmit() {
    this.companyService.createCompany(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-company']);
      });
  }

}
