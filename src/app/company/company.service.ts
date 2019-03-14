import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();
  }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .subscribe(c => this.companies$.next(c));
  }

  getCompanies(): Observable<Company[]> {
    console.log('Running GET COMPANIES');
    return this.companies$;
  }

  deleteCompany(id: number) {
    console.log('Service - delete company called');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(this.handleError)
    ).subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company) {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company`, company, { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .pipe(catchError(this.handleError))
    .subscribe(c => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(this.handleError));
  }

  updateCompany(company: Company) {
    return this.httpClient.put(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(this.handleError))
    .subscribe(c => this.loadCompanies());
  }

  // TODO: Better error management (Generic)
  handleError(error: Error): Observable<any> {
    console.error('ERROR CAUGHT', error);
    return new Observable<any>();
  }

}
