import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import handleError from '../shared/error';
import { ITrip } from 'app/shared/interfaces/trip';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';
import { take } from 'rxjs/operators';
import { first, map } from 'rxjs/operators';
import { tokenReference } from '@angular/compiler';
import { getUserId } from 'app/shared/utils';


@Injectable()
export class TripService {
  token = null;
  private URL = "http://localhost:3030/excursion";

  private httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(private http: Http) {
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers.append("x-authorization", token);
  }



  getExcursions(query = '') {
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers["x-authorization"] = token;
    console.log(`query in service=${query}`);
    const res = this.http.get(`${this.URL}${query}`, this.httpOptions)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('getExcursions'))
      )
    return res;
  }

  getExcursionsById(id) {
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers["x-authorization"] = token;
    const res = this.http.get(`${this.URL}/${id}`, this.httpOptions)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('getExcursionsById'))
      )
    return res;

  }

  reserveSeat(excursionId) {
    const userId = getUserId();
    console.log(userId);
    console.dir(this.httpOptions);
    return this.http.post(`${this.URL}/${excursionId}`, JSON.stringify({ userId }), this.httpOptions);
  }

  checkUserEnlisted(excursionId) {
    return this.http.get(`${this.URL}/${excursionId}`, this.httpOptions)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('checkUserEnlisted'))
      );
  }

}
