import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatSocketService } from './chat-socket.service';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { ChatMessage, SocketJoin } from '../model/socket.modal';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  public currentJoinedObservable = new BehaviorSubject<SocketJoin>(null);
  public observableRooms = new BehaviorSubject<string[]>(['room 1', 'room 2', 'room 3']);

  private currentJoinedRoom: SocketJoin;

  constructor(private chatSocketService: ChatSocketService, private userService: UserService) { }

  async joinRoom(room) {
    if (!_.isEmpty(this.currentJoinedRoom)) {
      this.chatSocketService.leaveRoom(this.currentJoinedRoom.room, this.currentJoinedRoom.id);
    }
    this.currentJoinedRoom = await this.chatSocketService.joinRoom(room, this.userService.getUser());
    this.currentJoinedObservable.next(this.currentJoinedRoom);
  }

  sendMessage(message): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      const user = this.userService.getUser();
      this.chatSocketService.sendMessage(this.currentJoinedRoom.room, this.currentJoinedRoom.id + '__' + user, message, resolve);
    });
  }

}
