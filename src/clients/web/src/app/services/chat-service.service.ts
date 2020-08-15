import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket-service.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = wsService
      .connect();
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  public sendMsg(msg: any) {
    this.messages.next(msg);
  }

}