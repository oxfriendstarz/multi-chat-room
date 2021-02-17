import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private session: SessionStorageService) { }

  addStorage(key, data) {
    this.session.set(key, data);
  }

  getStorage(key): any {
    return this.session.get(key);
  }

  deleteStorage(key) {
    this.session.remove(key);
  }

  clearAll() {
    this.session.clear();
  }
}
