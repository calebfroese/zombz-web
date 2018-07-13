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
  game: Phaser.Game;
  players$: Observable<any>;
  constructor(public socket: SocketService) {}

  ngOnInit() {
    this.socket.connect();
    this.players$ = this.socket.getPlayers();
    const self = this;
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#0000ff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: {
        preload: function() {
          return self.preload(this);
        },
        create: function() {
          return self.create(this);
        },
      },
    });
  }

  preload(scene: Phaser.Scene) {
    scene.load.image(
      'player',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR-ZPm-cFMR2SoVYEwXj6-woa6gWj4iG9s4H-FS7FXQlevcPZ87g',
    );
  }

  create(scene: Phaser.Scene) {
    scene.add.image(500, 500, 'player');
  }
}
