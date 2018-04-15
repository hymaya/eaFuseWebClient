import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../domain/User';
import {MessageService} from './message.service';
import {of} from 'rxjs/observable/of';
import {LoginVM} from '../domain/LoginVM';

@Injectable()
export class AuthenticationService {

  private serverUrl = 'http://localhost:8080/api';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl + '/users')
      .pipe(catchError(this.handleError('getUsers', [])));
  }

  /** GET users from the server */
  getCurrentUser(): Observable<User> {
    this.isTokenValid();
    return this.http.get<User>(this.serverUrl + '/account')
      .pipe(catchError(this.handleError('getUser', null)));
  }


  /** POST: add a new user to the server */
  authenticate(login: LoginVM): Observable<any> {
    return this.http.post<any>(this.serverUrl + '/authenticate', login).pipe(
      tap((token: any) => {
        console.log(token);
        localStorage.setItem('auth-token', 'Bearer ' + token['id_token']);
        this.log('added ' + token['id_token']);
      }),
      catchError(this.handleError<User>('authenticate'))
    );
  }

  isTokenValid() {
    const login: LoginVM = {
      username: 'admin',
      password: 'admin',
      rememberMe: true
    };
    localStorage.getItem('auth-user');
    const token = localStorage.getItem('auth-token');
    if (!token) {
      this.authenticate(login).subscribe(token => {
        localStorage.setItem('auth-token', 'Bearer ' + token['id_token']);
      });
    }
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
  }

}
