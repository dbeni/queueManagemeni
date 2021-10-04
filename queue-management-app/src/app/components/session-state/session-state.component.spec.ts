import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStateComponent } from './session-state.component';

describe('SessionStateComponent', () => {
  let component: SessionStateComponent;
  let fixture: ComponentFixture<SessionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
