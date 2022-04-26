import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-button-modal',
  templateUrl: './confirm-button-modal.component.html',
  styleUrls: ['./confirm-button-modal.component.scss']
})
export class ConfirmButtonModalComponent implements OnInit {

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  public error: any = {};

  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void { }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }

  public remove() {
    this.isError = true;
    this.isSuccess = false;
    this.close();
  }

  public edit() {
    this.isError = false;
    this.isSuccess = true;
    this.close();
  }
}
