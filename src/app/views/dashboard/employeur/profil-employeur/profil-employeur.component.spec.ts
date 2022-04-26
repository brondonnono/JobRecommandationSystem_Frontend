import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEmployeurComponent } from './profil-employeur.component';

describe('ProfilEmployeComponent', () => {
  let component: ProfilEmployeurComponent;
  let fixture: ComponentFixture<ProfilEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilEmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
