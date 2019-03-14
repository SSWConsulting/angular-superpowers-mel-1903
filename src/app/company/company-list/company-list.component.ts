import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Subscription, Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

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
    this.companies$ = this.companyService.getCompanies()
      .pipe(
        tap(x => console.log('GOT A VALUE', x))
      );
  }





}
