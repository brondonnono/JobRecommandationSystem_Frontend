import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-box',
  templateUrl: './container-box.component.html',
  styleUrls: ['./container-box.component.scss']
})
export class ContainerBoxComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }
}
