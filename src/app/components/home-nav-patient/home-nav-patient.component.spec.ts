import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavPatientComponent } from './home-nav-patient.component';

describe('HomeNavPatientComponent', () => {
  let component: HomeNavPatientComponent;
  let fixture: ComponentFixture<HomeNavPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNavPatientComponent]
    });
    fixture = TestBed.createComponent(HomeNavPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
