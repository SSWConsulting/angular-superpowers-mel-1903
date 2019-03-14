import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor() { }

  companies: Company[];

  ngOnInit() {
    this.companies = this.getCompanies();
  }

  getCompanies(): Company[] {
    return [
      {name: 'Company A', phone: 123456, email: 'companyA@ssw.com.au'},
      {name: 'Company B', phone: 456789, email: 'companyB@ssw.com.au'},
      {name: 'Company C', phone: 789123, email: 'companyC@ssw.com.au'}
    ];
  }

}
