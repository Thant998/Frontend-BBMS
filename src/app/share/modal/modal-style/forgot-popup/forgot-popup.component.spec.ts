import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPopupComponent } from './forgot-popup.component';

describe('ForgotPopupComponent', () => {
  let component: ForgotPopupComponent;
  let fixture: ComponentFixture<ForgotPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
