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
    return this.http.post(registerUrl, JSON.stringify({ email, password }))
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
    try {
      var s = this.http.post(loginUrl, JSON.stringify({ email, password }))
        .pipe(
          tap((res) => console.log(`response: ${Object["values"](res)}`)),
          catchError(handleError<any>('logUser'))
        );
      return s;
    } catch (err) {
      alert(err)
    }
  }


  logout() {
    localStorage.clear();
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (document.cookie) {
      document.cookie = 'name' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    return this.http.get(`${this.URL}/users/logout`);
  }

}
