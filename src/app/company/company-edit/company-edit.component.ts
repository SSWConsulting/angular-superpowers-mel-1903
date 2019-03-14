import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder) { }

  company = {} as Company;
  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  ngOnInit() {
    // tslint:disable-next-line:no-bitwise
    this.companyId = ~~(this.activatedRoute.snapshot.params['id']);
    this.isNewCompany = this.companyId === 0;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['default@email.com'],
    });
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value);
      this.router.navigateByUrl('/company/list');
    } else {
      const newCompany = {...this.companyForm.value, id: this.companyId };
      this.companyService.updateCompany(newCompany);
      this.router.navigateByUrl('/company/list');
    }
  }
}
