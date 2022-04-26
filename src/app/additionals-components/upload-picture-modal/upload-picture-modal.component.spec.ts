import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPictureModalComponent } from './upload-picture-modal.component';

describe('UploadPictureModalComponent', () => {
  let component: UploadPictureModalComponent;
  let fixture: ComponentFixture<UploadPictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPictureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
