import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CredentialsService } from '../auth/credentials.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  // Our socket connection
  private socket: any;

  constructor(
    private credentialsService: CredentialsService
  ) { }

  connect(): Subject<MessageEvent> {
    if (!this.credentialsService.isAuthenticated) {
      return;
    }

    const token = this.credentialsService.credentials.token;

    this.socket = io(environment.wsUrl + `?token=${token}&userId=10`, {
      reconnection: true, // whether to reconnect automatically
      reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
      reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
      reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
      randomizationFactor: 0.5,
    });
    // Should be implement authentication/authorization

    let observable = new Observable((observer) => {
      this.socket.on('message', (data: any) => {
        // console.log('message:', data);
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    let newObserver = {
      next: (data: Object) => {
        this.socket.emit('message', data);
      },
    };

    return Subject.create(newObserver, observable);
  }
}
