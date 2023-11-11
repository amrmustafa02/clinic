import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesNavDoctorComponent } from './messages-nav-doctor.component';

describe('MessagesNavDoctorComponent', () => {
  let component: MessagesNavDoctorComponent;
  let fixture: ComponentFixture<MessagesNavDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesNavDoctorComponent]
    });
    fixture = TestBed.createComponent(MessagesNavDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
