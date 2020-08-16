import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  // Our socket connection
  private socket: any;

  constructor() {}

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.wsUrl + '?token=abc&userId=1', {
      reconnection: true, // whether to reconnect automatically
      reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
      reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
      reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
      randomizationFactor: 0.5,
    });
    // Should be implement authentication/authorization

    let observable = new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        this.socket.emit('chat message', JSON.stringify('Client received !'));
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Subject.create(observer, observable);
  }
}
