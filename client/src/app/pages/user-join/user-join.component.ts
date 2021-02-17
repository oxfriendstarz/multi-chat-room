import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-join',
  templateUrl: './user-join.component.html',
  styleUrls: ['./user-join.component.css']
})
export class UserJoinComponent implements OnInit {

  public joinForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  joinToChatRoom() {
    this.userService.signUp(this.joinForm.get('user').value);
    this.router.navigate(['/chat-room']);
  }

}
