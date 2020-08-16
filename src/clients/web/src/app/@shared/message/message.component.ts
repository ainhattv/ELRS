import { Component, OnInit, Input } from '@angular/core';

export interface IMessageModel {
  messageId: string;
  from: string;
  fromThumnailUrl: string;
  messageType: string;
  message: string;
  createdDate: string;
  editedDate: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: IMessageModel;

  constructor() {}

  ngOnInit(): void {}
}
