import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailPopupComponent } from './card-detail-popup.component';

describe('CardDetailPopupComponent', () => {
  let component: CardDetailPopupComponent;
  let fixture: ComponentFixture<CardDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDetailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
