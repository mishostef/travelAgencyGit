import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Headers, Http } from '@angular/http';
import { IUser } from 'app/shared/interfaces/user';
import handleError from 'app/shared/error';


@Injectable()
export class UserService {
  private URL = "http://localhost:3030";
  private httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: Http) { }

  registerUser(email, password) {
    const registerUrl = `${this.URL}/users/register`;
    return this.http.post(registerUrl, JSON.stringify({ email, password }), this.httpOptions)
      .pipe(
        tap((res) => console.log(`added user ${res}`)),
        catchError(handleError<IUser>('addUser'))
      );
  }

  isLogged() {
    return !!localStorage.getItem('authToken');
  }

  loginUser(email, password) {
    const loginUrl = `${this.URL}/users/login`;
    return this.http.post(loginUrl, JSON.stringify({ email, password }), this.httpOptions)
      .pipe(

        tap((res) => console.log(`response: ${Object["values"](res)}`)),

        catchError(handleError<IUser>('logUser'))
      );
  }
 

  logout() {
    return this.http.get(`${this.URL}/users/logout`); 
  }

  getUserById(id){
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers["x-authorization"] = token;
    return this.http.get(`${this.URL}/users/user/${id}`,this.httpOptions);
  }

}
