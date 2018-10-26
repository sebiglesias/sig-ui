import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';


@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {

  companys: Company[];

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAllCompanies()
      .subscribe( data => {
        this.companys = data;
      });
  }

  editCompany(company: Company): void {
    localStorage.removeItem('editCompanyId');
    localStorage.setItem('editCompanyId', company.id.toString());
    this.router.navigate(['edit-company']);
  }

  addCompany(): void {
    this.router.navigate(['add-company']);
  }
}
