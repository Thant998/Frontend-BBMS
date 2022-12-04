import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdComponent } from './change-pwd.component';

describe('ChangePwdComponent', () => {
  let component: ChangePwdComponent;
  let fixture: ComponentFixture<ChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
