import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsNavDoctorComponent } from './patients-nav-doctor.component';

describe('PatientsNavDoctorComponent', () => {
  let component: PatientsNavDoctorComponent;
  let fixture: ComponentFixture<PatientsNavDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsNavDoctorComponent]
    });
    fixture = TestBed.createComponent(PatientsNavDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
