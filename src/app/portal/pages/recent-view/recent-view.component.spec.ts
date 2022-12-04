import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentViewComponent } from './recent-view.component';

describe('RecentViewComponent', () => {
  let component: RecentViewComponent;
  let fixture: ComponentFixture<RecentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
