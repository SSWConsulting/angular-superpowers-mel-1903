import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    console.log('Running GET COMPANIES');
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCompany(id: number): Observable<Company> {
    console.log('Service - delete company called');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company`, company, { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .pipe(catchError(this.handleError));
  }

  // TODO: Better error management (Generic)
  handleError(error: Error): Observable<any> {
    console.error('ERROR CAUGHT', error);
    return new Observable<any>();
  }

}
