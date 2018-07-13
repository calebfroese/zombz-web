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
  scene: Phaser.Scene;
  self: Phaser.GameObjects.Image;
  players: { [key: string]: Phaser.GameObjects.Image } = {};
  constructor(public socket: SocketService) {}

  ngOnInit() {
    this.socket.connect();
    const self = this;
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#0000ff',
      input: {
        keyboard: true,
      },
      scene: {
        preload: function() {
          return self.preload(this);
        },
        create: function() {
          return self.create(this);
        },
        update: function() {
          return self.update();
        },
      },
    });
  }

  preload(scene: Phaser.Scene) {
    this.scene = scene;
    this.scene.load.image(
      'player',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR-ZPm-cFMR2SoVYEwXj6-woa6gWj4iG9s4H-FS7FXQlevcPZ87g',
    );
  }

  create(scene: Phaser.Scene) {
    this.self = this.scene.add
      .image(500, 500, 'player')
      .setDisplaySize(100, 100);
    this.socket.getPlayers().subscribe(players => {
      players.forEach(player => {
        if (player.id === this.socket.getId()) {
          this.self.setPosition(player.position.x, player.position.y);
        } else {
          if (!this.players[player.id]) {
            this.players[player.id] = this.scene.add
              .image(500, 500, 'player')
              .setDisplaySize(100, 100);
          }
          this.players[player.id].setPosition(
            player.position.x,
            player.position.y,
          );
        }
      });
    });
  }

  update() {
    const up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W,
    ).isDown;
    const down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S,
    ).isDown;
    const left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A,
    ).isDown;
    const right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D,
    ).isDown;
    const movement = { up, down, left, right };
    this.socket.sendUser([movement]);
  }
}
