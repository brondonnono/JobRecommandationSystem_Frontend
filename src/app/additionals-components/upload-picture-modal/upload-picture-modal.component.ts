import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-upload-picture-modal',
  templateUrl: './upload-picture-modal.component.html',
  styleUrls: ['./upload-picture-modal.component.scss']
})
export class UploadPictureModalComponent implements OnInit {

  public mode: string;
  public budgetImageId: number;
  public uploadImageName = '';

  public form = this.fb.group({
    budgetImg: [null, Validators.required]
  });

  public budgetImage: { file: File, url: string } = {
    file: null,
    url: ''
  };

  public formData = new FormData();

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  constructor(
    public modalService: BsModalRef,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setOldImgUrl();
  }

  get f() {
    return this.form.controls;
  }

  public setOldImgUrl(): void {
    
  }

  public initForm(): void {
    this.form = this.fb.group({
      budgetImg: [null, Validators.required]
    });
  }

  public update(): void {
    this.isLoading = true;
    this.dataService.uploadFile(this.budgetImage.file, 1).subscribe((res) => {
      this.isSuccess = true;
      this.isError = false;
      this.isLoading = false;
      console.log(res);
      this.close();
    }, (error)=> {
      this.isError = true;
      this.isLoading = false;
      console.log(error);
      this.close();
    });
  }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }

  public selectFile(event: any): void {
    const file: File = event.target.files[0];
    const validationStatus: boolean = this.validateFile(file);
    if (!validationStatus) {
      alert('Veuillez selectionner une image!');
      this.budgetImage.file = null;
      this.budgetImage.url = '';
      return;
    }
    this.budgetImage.file = file;
    this.uploadImageName = file.name;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.budgetImage.url = fileReader.result as string;
    };
    this.formData.append("img", file, file.name);
  }

  public validateFile(file: File): boolean {
    const pattern: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
    return pattern.includes(file.type);
  }

}
