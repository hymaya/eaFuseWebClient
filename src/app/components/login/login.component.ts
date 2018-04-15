import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginVM} from '../../domain/LoginVM';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() name;

  private _loginVM: LoginVM;

  constructor(public activeModal: NgbActiveModal, private authenticationService: AuthenticationService) {
    this._loginVM = {
      username: null,
      password: null,
      rememberMe: true
    };
  }

  login() {
    console.log(this._loginVM);
    this.activeModal.dismiss('login success');
    this.authenticationService.authenticate(this._loginVM).subscribe(users => {
      console.log(users);
    });
  }
  ngOnInit() {

  }


  get loginVM(): LoginVM {
    return this._loginVM;
  }
}
