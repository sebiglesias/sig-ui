import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Router} from '@angular/router';
import {validationMessages} from '../../../models/validationMessages';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService) { }

  addForm: FormGroup;
  validationMessages: any;

  ngOnInit() {
    this.validationMessages = validationMessages;
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });

  }

  onSubmit() {
    this.companyService.createCompany(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-company']);
      });
  }

}
