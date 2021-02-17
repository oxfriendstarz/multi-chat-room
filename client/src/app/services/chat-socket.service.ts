import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
import { SocketJoin, SocketKey } from '../model/socket.modal';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  private socket: SocketIOClient.Socket = null;

  constructor() {
    if (this.socket === null) {
      this.socket = socketIo(`${environment.chat_server}`, {
        path: '/rooms',
        reconnectionAttempts: Infinity,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
      });
      this.checkSocketCocnnection();
      this.checkSockerDisconnection();
    }
  }

  private checkSocketCocnnection() {
    this.socket.on('connect', () => { console.log('Connected') });
  }

  private checkSockerDisconnection() {
    this.socket.on('disconnect', () => { console.log('Disconnected') });
  }

  sendMessage(room: string, user: string, message: string, ackMessage: Function): void {
    this.socket.emit(SocketKey.OUTGOING_MESSAGE, room, user, message, ackMessage);
  }

  recievedMessage(recieveMessage: Function) {
    this.socket.on(SocketKey.INCOMING_MESSAGE, recieveMessage);
  }

  public leaveRoom(room, socketId) {
    this.socket.emit(SocketKey.LEAVE_ROOM, room, socketId);
  }

  public joinRoom(room: string, user: string): Promise<SocketJoin> {
    return new Promise((resolve, reject) => {
      try {
        this.socket.emit(SocketKey.JOIN_ROOM, room, user, (ackMessage)=> {
          resolve(_.head(ackMessage))
        });
      } catch (error) {
        reject(error);
      }
    })
  }

}
