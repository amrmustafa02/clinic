import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoleComponent } from './choose-role.component';

describe('ChooseRoleComponent', () => {
  let component: ChooseRoleComponent;
  let fixture: ComponentFixture<ChooseRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRoleComponent]
    });
    fixture = TestBed.createComponent(ChooseRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
