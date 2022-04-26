import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmButtonModalComponent } from './confirm-button-modal.component';

describe('ConfirmButtonModalComponent', () => {
  let component: ConfirmButtonModalComponent;
  let fixture: ComponentFixture<ConfirmButtonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmButtonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmButtonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
