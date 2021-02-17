import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  public selectedRoom: string;

  constructor() { }

  ngOnInit(): void {
  }

  public changingRoom(room: string) {
    this.selectedRoom = room;
  }

}
