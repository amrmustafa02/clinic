import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorsNavPatientComponent } from './majors-nav-patient.component';

describe('MajorsNavPatientComponent', () => {
  let component: MajorsNavPatientComponent;
  let fixture: ComponentFixture<MajorsNavPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MajorsNavPatientComponent]
    });
    fixture = TestBed.createComponent(MajorsNavPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
