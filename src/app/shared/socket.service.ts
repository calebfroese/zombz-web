import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as socket from 'socket.io-client';

import { Events } from '../config';

@Injectable()
export class SocketService {
  private io: SocketIOClient.Socket;
  private players$ = new BehaviorSubject([]);

  connect() {
    this.io = socket.connect('http://localhost:3000');
    this.listenForEvents();
    this.io.emit(Events.UserConnect, Math.random().toString());
  }

  private listenForEvents() {
    this.io.on(Events.ServerPlayersUpdate, data => {
      this.players$.next(data);
    });
  }

  getPlayers() {
    return this.players$;
  }

  getId() {
    return this.io.id;
  }

  sendUser(data: any[]) {
    this.io.emit(Events.UserUpdate, data);
  }
}
