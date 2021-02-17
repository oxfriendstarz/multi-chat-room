import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, OnDestroy {

  @Output() changeRoom = new EventEmitter<string>();

  rooms: string[];
  currentRoom: string;

  private destroy$ = new Subject<void>();

  constructor(private chatRoomService: ChatRoomService) {
    this.chatRoomService.observableRooms.pipe(takeUntil(this.destroy$)).subscribe(rooms => {
      this.rooms = rooms;
      this.autoSelectRoom();
    });
  }

  ngOnInit(): void {}

  changingRoom(room: string) {
    this.currentRoom = room;
    this.chatRoomService.joinRoom(room);
    this.changeRoom.emit(room);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private autoSelectRoom() {
    if (_.isEmpty(this.currentRoom)) {
      this.changingRoom(_.head(this.rooms));
    }
  }

}
