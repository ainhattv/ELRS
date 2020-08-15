import { Component, OnInit } from '@angular/core';
import { IMessageModel } from '@shared/message/message.component';

export interface IChatModel {
  roomId: string;
  roomName: string;
  roomTitle: string;
  roomThumailUrl: string;
  messages: Array<IMessageModel>;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public editorString: string;

  public chatModel: IChatModel = {
    roomId: '123',
    roomName: "Chat Room 1",
    roomTitle: "Chat Room title",
    roomThumailUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    messages: [
      {
        messageId: '1',
        from: 'Developer',
        fromThumnailUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
        messageType: 'string',
        message: 'The package ngx-deploy-docker is included as both a dev',
        createdDate: 'today',
        editedDate: null
      }
    ]
  }

  constructor() { }

  ngOnInit(): void { }

  public pushMessage() {
    var message: IMessageModel = {
      messageId: '2',
      from: 'Developer',
      fromThumnailUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
      messageType: 'string',
      message: this.editorString,
      createdDate: 'today',
      editedDate: null
    }

    this.chatModel.messages.push(message);

    this.cleanInput();
  }

  private cleanInput() {
    this.editorString = null;
  }
}
