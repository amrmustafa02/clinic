import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentNavDoctorComponent } from './appoinment-nav-doctor.component';

describe('AppoinmentNavDoctorComponent', () => {
  let component: AppoinmentNavDoctorComponent;
  let fixture: ComponentFixture<AppoinmentNavDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppoinmentNavDoctorComponent]
    });
    fixture = TestBed.createComponent(AppoinmentNavDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
