import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavDoctorComponent } from './home-nav-doctor.component';

describe('HomeNavDoctorComponent', () => {
  let component: HomeNavDoctorComponent;
  let fixture: ComponentFixture<HomeNavDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNavDoctorComponent]
    });
    fixture = TestBed.createComponent(HomeNavDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
