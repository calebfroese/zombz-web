import { Injectable } from '@angular/core';
import * as socket from 'socket.io-client';

import { Events } from '../config';

@Injectable()
export class SocketService {
  io: SocketIOClient.Socket;

  connect() {
    this.io = socket.connect('http://localhost:3000');
    this.listenForEvents();
    this.io.emit(Events.UserConnect, Math.random().toString());
  }

  listenForEvents() {
    this.io.on(Events.ServerPlayersUpdate, data => {
      console.log('Current players:', data);
    });
  }
}
