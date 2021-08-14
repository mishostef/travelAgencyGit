import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import handleError from '../shared/error';
import { ITrip } from 'app/shared/interfaces/trip';
import { catchError, tap } from 'rxjs/operators';
import { getUserId } from 'app/shared/utils';



@Injectable()
export class TripService {
  token = null;
  private URL = "http://localhost:3030/excursion";


  constructor(private http: Http) { }



  getExcursionsAndVacations(query = '') {
    console.log(`query in service=${query}`);
    const res = this.http.get(`${this.URL}${query}`)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('getExcursionsAndVacations'))
      )
    return res;
  }

  getExcursionsById(id) {
    const res = this.http.get(`${this.URL}/${id}`)
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
    return this.http.post(`${this.URL}/${excursionId}`, JSON.stringify({ userId }))
  }

  checkUserEnlisted(excursionId) {
    return this.http.get(`${this.URL}/${excursionId}`)
      .pipe(
        tap((x) => {
          console.log(`x=${x}`);
        })
        , catchError(handleError<ITrip>('checkUserEnlisted'))
      );
  }

  getPromoted() {
    return this.http.get(`${this.URL}/promotions`)
  }

  getNewOffers() {
    return this.http.get(`${this.URL}/new`)
  }

  getVactions() {
    return this.http.get(`${this.URL}/vacations`)
  }

  getExcursions() {
    return this.http.get(`${this.URL}/excursions`)
  }
  getTripsByUser(id) {
    return this.http.get(`${this.URL}?userid=${id}`)
      .pipe(tap(x => console.log(`in observable:${x}`))

      )
  }

  getMostVisited() {
    return this.http.get(`${this.URL}?orderby=visited`);
  }

}
