import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ChatRoomService } from 'src/app/services/chat-room.service';
import { ChatSocketService } from 'src/app/services/chat-socket.service';
import { ChatMessage } from '../../model/socket.modal';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('chatHistory') chatHistory: ElementRef;

  @Input() room: string;

  public chatMessages = new Map<string, ChatMessage[]>();

  public chatForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  constructor(private chatRoomService: ChatRoomService, private chatSocketService: ChatSocketService) {}

  ngOnInit(): void {
    this.chatSocketService.recievedMessage((message) => {
      this.updateRoomHistory(message);
      this.scrollToBottom();
    });
  }

  @HostListener('document:keydown', ['$event'])
  async sendMessage(event) {
    const message = this.chatForm.get('message').value;
    const keyCode = typeof event.keyCode !== 'undefined' ? event.keyCode : '0';
    const enterKeyCode = 13;
    if (!_.isEmpty(message) && parseInt(keyCode) === enterKeyCode) {
      const chatMessage =  await this.chatRoomService.sendMessage(message);
      this.updateRoomHistory(chatMessage);
      this.chatForm.get('message').setValue('');
    }
  }

  public updateRoomHistory(chatMessage: ChatMessage) {
    if (!this.chatMessages.has(this.room)) {
      this.chatMessages.set(this.room, []);
    }
    const messages = this.chatMessages.get(this.room);
    messages.push(chatMessage);
    this.chatMessages.set(this.room, messages);
    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight - this.chatHistory.nativeElement.clientHeight;
    }, 200);
  }

}
