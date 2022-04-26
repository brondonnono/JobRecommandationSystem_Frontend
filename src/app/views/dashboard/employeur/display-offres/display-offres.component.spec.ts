import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOffresComponent } from './display-offres.component';

describe('DisplayOffresComponent', () => {
  let component: DisplayOffresComponent;
  let fixture: ComponentFixture<DisplayOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
