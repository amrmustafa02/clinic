import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePatientComponent } from './home-patient.component';

describe('HomePatientComponent', () => {
  let component: HomePatientComponent;
  let fixture: ComponentFixture<HomePatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePatientComponent]
    });
    fixture = TestBed.createComponent(HomePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
