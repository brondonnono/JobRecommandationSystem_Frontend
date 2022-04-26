import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * @author Brondon Nono
 * @email brondonnono3@gmail.com
 */
export interface IChangePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-email-reset-password-modal',
  templateUrl: './email-reset-password-modal.component.html',
  styleUrls: ['./email-reset-password-modal.component.scss']
})
export class EmailResetPasswordModalComponent implements OnInit {

  public email: string = '';

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  public error: any = {};

  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  public save(): void {
    this.isLoading = true;
    this.isSuccess = true;
    this.close();
    /*this.userService.rememberUserPasswordUsingGET(this.email).toPromise().then(
      res => {
        if(res) {
          this.isSuccess = true;
        }
      }
    ).catch(
      error => {
        this.isError = true;
        this.error = error.error;
      }
    ).finally(
      () => {
        this.isLoading = false;
        this.close();
      }
    )*/
  }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }
}
