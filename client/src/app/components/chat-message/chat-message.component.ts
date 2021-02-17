import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatMessage, SocketJoin } from 'src/app/model/socket.modal';
import { ChatRoomService } from 'src/app/services/chat-room.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;

  private destroy$ = new Subject<void>();
  private currentRoomSocket: SocketJoin;

  constructor(private chatRoomService: ChatRoomService) {
    this.chatRoomService.currentJoinedObservable.pipe(takeUntil(this.destroy$))
    .subscribe(socketRoom => {
      this.currentRoomSocket = socketRoom;
    });
  }

  isOwnMessage(user) {
    return user === this.currentRoomSocket.id + '__' + this.currentRoomSocket.user;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
