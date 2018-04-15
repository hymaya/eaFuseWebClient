import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './domain/User';
import {LoginModalService} from './services/login-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private loginService: LoginModalService) {
    this.currentUser = {
      'id': 4,
      'login': 'user',
      'firstName': 'User',
      'lastName': 'User',
      'email': 'user@localhost',
      'imageUrl': '',
      'activated': true,
      'langKey': 'en',
      'createdBy': 'system',
      'createdDate': '2018-04-12T18:32:37Z',
      'lastModifiedBy': 'system',
      'lastModifiedDate': null,
      'authorities': [
        'ROLE_USER'
      ]
    };
  }

  ngOnInit() {

    this.authenticationService.getUsers().subscribe(users => {
      console.log(users);
    });
  }

  open() {
    this.loginService.open();
  }
}
