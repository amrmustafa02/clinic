import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsNavPatientComponent } from './appoinments-nav-patient.component';

describe('AppoinmentsNavPatientComponent', () => {
  let component: AppoinmentsNavPatientComponent;
  let fixture: ComponentFixture<AppoinmentsNavPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppoinmentsNavPatientComponent]
    });
    fixture = TestBed.createComponent(AppoinmentsNavPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
