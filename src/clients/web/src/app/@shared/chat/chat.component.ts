import { Component, OnInit } from '@angular/core';
import { IMessageModel } from '@shared/message/message.component';
import { ChatService } from '../../services/chat-service.service';

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
    roomId: 'general',
    roomName: 'Chat Room 1',
    roomTitle: 'Chat Room title',
    roomThumailUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    messages: [],
  };

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {

    this.subscribeRoomChanel();
  }

  public pushMessage() {
    var newmessage: IMessageModel = this.createMessage(this.editorString);

    this.chatModel.messages.push(newmessage);
    this.chatService.sendMsg(newmessage);

    this.cleanInput();
  }

  private subscribeRoomChanel(): void {
    this.chatService.messages.subscribe(message => {

      if (typeof (message) == 'string') {
        message = JSON.parse(message);
      }

      this.chatModel.messages.push(message);
    })
  }

  private createMessage(messageString: string): IMessageModel {
    return {
      messageId: '2',
      from: 'Developer',
      fromThumnailUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      messageType: 'string',
      message: messageString,
      createdDate: 'today',
      editedDate: null,
      roomId: 'general'
    };
  }

  private cleanInput() {
    this.editorString = null;
  }

  /**
   * Push message with enter key
   * @param event KeyboardEvent
   */
  keyPress(event: KeyboardEvent) {
    // if (event.keyCode == 13) {
    //   this.pushMessage();
    // }
  }
}
