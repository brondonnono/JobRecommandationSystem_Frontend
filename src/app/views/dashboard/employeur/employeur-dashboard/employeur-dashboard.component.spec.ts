import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeurDashboardComponent } from './employeur-dashboard.component';

describe('EmployeurDashboardComponent', () => {
  let component: EmployeurDashboardComponent;
  let fixture: ComponentFixture<EmployeurDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeurDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
