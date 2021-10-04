import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorListComponent } from './tor-list.component';

describe('TorListComponent', () => {
  let component: TorListComponent;
  let fixture: ComponentFixture<TorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
