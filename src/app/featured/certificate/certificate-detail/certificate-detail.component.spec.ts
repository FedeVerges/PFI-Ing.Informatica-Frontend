import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetailComponentWrapper } from './certificate-detail.component';

describe('CertificateDetailComponent', () => {
  let component: CertificateDetailComponentWrapper;
  let fixture: ComponentFixture<CertificateDetailComponentWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDetailComponentWrapper ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDetailComponentWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
