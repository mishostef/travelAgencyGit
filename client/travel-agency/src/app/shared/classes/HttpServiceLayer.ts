import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


/**
* This class extends the Http class from angular and adds automaticaly the server URL(if in development mode) and 2 headers by default:
* Headers added: 'Content-Type' and 'X-AUTH-TOKEN'.
* 'Content-Type' can be set in any othe service, and if set, it will NOT be overwritten in this class any more.
*/

export class HttpServiceLayer extends Http {
    appConfig = {
        getServerAdress: "localhost:3000",
        getAuthToken: localStorage.getItem('authToken')
    };




    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);

    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {       
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return  req;
    }
    request(url: string | Request, options?: RequestOptions): Observable<Response> {
        const opts = this.getRequestOptionArgs(options);
        return this.intercept(super.request(url, opts));
    }



    /**
    * This method checks if there are any headers added and if not created the headers map and ads 'Content-Type' and 'X-AUTH-TOKEN'
    * 'Content-Type' is not overwritten if it is allready available in the headers map
    */

    getRequestOptionArgs(options: any): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (!options.headers.get('Content-Type')) {
            options.headers.append('Content-Type', 'application/json');
        }

        if (this.appConfig.getAuthToken != null) {

            options.headers.append('x-authorization', this.appConfig.getAuthToken);
        }

        return options;
    }

    /**
    * This method as the name sugests intercepts the request and checks if there are any errors.
    * If an error is present it will be checked what error there is and if it is a general one then it will be handled here, otherwise, will be
    * thrown up in the service layers
    */
    intercept(observable: Observable<Response>): Observable<Response> {

        //  return observable;
        return observable.catch((err, source) => {
            if (err.status == 401) {
                this._router.navigate(['/login']);
                //return observable;
                return Observable.empty();
            } else {
                //return observable;
                return Observable.throw(err);
            }
        });
    }
}