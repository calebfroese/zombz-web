import { Component, OnInit } from '@angular/core';

import { SocketService } from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public socket: SocketService) {}

  ngOnInit() {
    this.socket.connect();
  }
}
