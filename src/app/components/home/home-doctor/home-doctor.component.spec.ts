import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDoctorComponent } from './home-doctor.component';

describe('HomeDoctorComponent', () => {
  let component: HomeDoctorComponent;
  let fixture: ComponentFixture<HomeDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDoctorComponent]
    });
    fixture = TestBed.createComponent(HomeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
