import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreEmployeurDetailComponent } from './offreEmployeur-detail.component';

describe('OffreDetailComponent', () => {
  let component: OffreEmployeurDetailComponent;
  let fixture: ComponentFixture<OffreEmployeurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreEmployeurDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreEmployeurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
