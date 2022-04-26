import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * @author Brondon Nono
 * @email brondonnono3@gmail.com
 */
@Component({
  selector: 'app-confirmation-message-modal',
  templateUrl: './confirmation-message-modal.component.html',
  styleUrls: ['./confirmation-message-modal.component.scss']
})
export class ConfirmationMessageModalComponent implements OnInit {
  public icon: string;
  public message: string;
  public title: string;

  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void { }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }
}
