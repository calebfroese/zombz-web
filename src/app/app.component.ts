import * as Phaser from 'phaser';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SocketService } from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  players$: Observable<any>;
  constructor(public socket: SocketService) {}

  ngOnInit() {
    this.socket.connect();
    this.players$ = this.socket.getPlayers();
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.outerWidth,
      height: window.outerHeight,
      backgroundColor: '#0000ff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: {
        preload: () => {
          console.log('preload');
        },
        create: () => {
          console.log('create');
        },
      },
    });
  }
}
