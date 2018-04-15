import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AppComponent} from './app.component';
import {AuthenticationService} from './services/authentication.service';
import {MessageService} from './services/message.service';
import {LoginModalService} from './services/login-modal.service';
import {EaFuseHttpInterceptor} from './config/eaFuseHttpInterceptor';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    AuthenticationService,
    MessageService,
    LoginModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EaFuseHttpInterceptor,
      multi: true,
    }],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
