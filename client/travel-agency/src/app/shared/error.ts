import { Observable} from "rxjs";
import { of } from "rxjs/observable/of";

export default function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      if(operation=='logUser')alert('Invalid email or password');
      else if(operation=='addUser')alert('register failed');
      else alert(JSON.parse(error['_body']).message);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }