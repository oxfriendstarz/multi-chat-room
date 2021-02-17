import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/material.module';
import { UserJoinComponent } from './pages/user-join/user-join.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    UserJoinComponent,
    ChatRoomComponent,
    RoomsComponent,
    ChatBoxComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
