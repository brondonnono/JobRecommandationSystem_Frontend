import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  public value: string = '';

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess = '';

  public error: any = {};
  
  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  public save(): void {
    this.isLoading = true;
    this.isSuccess = this.value;
    this.close();

  }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }

}
