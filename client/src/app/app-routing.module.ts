import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { UserJoinComponent } from './pages/user-join/user-join.component';

const routes: Routes = [
  { path: '', redirectTo: '/join', pathMatch: 'full' },
  { path: 'join', component: UserJoinComponent },
  { path: 'chat-room', component: ChatRoomComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
