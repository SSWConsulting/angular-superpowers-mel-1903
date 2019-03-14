import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(
    private companyService: CompanyService
    ) {}

  companies$: Observable<Company[]>;


  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(){
    this.companies$ = this.companyService.getCompanies()
    .pipe(
      tap(x => console.log('GOT A VALUE', x))
    );
  }

  deleteCompany(company: Company) {
    console.log('Component - delete company called');
    this.companyService.deleteCompany(company.id);
  }





}
