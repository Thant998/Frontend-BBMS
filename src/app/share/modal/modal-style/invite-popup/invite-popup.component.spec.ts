import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePopupComponent } from './invite-popup.component';

describe('InvitePopupComponent', () => {
  let component: InvitePopupComponent;
  let fixture: ComponentFixture<InvitePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
