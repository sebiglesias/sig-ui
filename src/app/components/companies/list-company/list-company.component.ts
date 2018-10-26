import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompanyService} from '../../../services/company.service';
import {Company} from '../../../models/company';
import * as $ from 'jquery';
import {spanishJson} from '../../../models/spanishJson';


@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {

  companies: Company[];
  dataTable: any;

  constructor(private router: Router, private companyService: CompanyService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.companyService.getAllCompanies()
      .subscribe( data => {
        this.companies = data;
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable({
          'language': {
            'url': spanishJson
          }
        });
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
