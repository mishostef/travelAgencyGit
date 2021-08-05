import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import handleError from '../shared/error';
import { ITrip } from 'app/shared/interfaces/trip';
import { catchError, tap } from 'rxjs/operators';
import { getUserId } from 'app/shared/utils';
import { map } from 'rxjs/operators';


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



  getExcursionsAndVacations(query = '') {
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers["x-authorization"] = token;
    console.log(`query in service=${query}`);
    const res = this.http.get(`${this.URL}${query}`, this.httpOptions)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('getExcursionsAndVacations'))
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
    const token = localStorage.getItem('authToken');
    this.httpOptions.headers["x-authorization"] = token;
    const userId = getUserId();
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

  getPromoted() {
    return this.http.get(`${this.URL}/promotions`, this.httpOptions)
  }

  getNewOffers() {
    return this.http.get(`${this.URL}/new`, this.httpOptions);
  }

  getVactions() {
    return this.http.get(`${this.URL}/vacations`, this.httpOptions);
  }

  getExcursions(){
    return this.http.get(`${this.URL}/excursions`, this.httpOptions);
  }
  getTripsByUser(id){
    return this.http.get(`${this.URL}?userid=${id}`, this.httpOptions)
    .pipe(tap(x=>console.log(`in observable:${x}`))
     
      )
  }


}
