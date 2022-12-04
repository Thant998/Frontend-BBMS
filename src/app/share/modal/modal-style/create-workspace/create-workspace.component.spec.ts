import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspaceComponent } from './create-workspace.component';

describe('CreateWorkspaceComponent', () => {
  let component: CreateWorkspaceComponent;
  let fixture: ComponentFixture<CreateWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
