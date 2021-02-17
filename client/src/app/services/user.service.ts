import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import * as _ from 'lodash';

const SESSION_KEY = 'USER';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private sessionService: SessionService) { }

  signUp(user) {
    this.sessionService.addStorage(SESSION_KEY, user);
  }

  getUser() {
    return this.sessionService.getStorage(SESSION_KEY);
  }

  hasUser() {
    const user = this.getUser();
    return !_.isEmpty(user);
  }
}
