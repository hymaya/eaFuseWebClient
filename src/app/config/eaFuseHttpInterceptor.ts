import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginModalService} from '../services/login-modal.service';
import {Injectable} from '@angular/core';

@Injectable()
export class EaFuseHttpInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginModalService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth-token');
    if (req.url.indexOf('authenticate') === -1) {
      if (token) {
        // Clone the request to add the new header
        const clonedRequest = req.clone({headers: req.headers.set('Authorization', token)});

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
      } else {
        this.loginService.open();
      }
    }
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(req);
  }
}
