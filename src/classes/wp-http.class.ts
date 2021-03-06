import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../service/config/config.service';
import { Helper } from './helper.functions';

@Injectable()
export class WpHttp extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private config: ConfigService) {
    super(backend, defaultOptions);
  }

  get(endpoint, args?): Observable<any> {

    return super.get(this.getUrl(endpoint, args), this.getOptions())
      .catch((err) => Observable.throw(err));
  }

  post(endpoint, body): Observable<any> {

    return super.post(this.getUrl(endpoint), body, this.getOptions())
      .catch((err) => Observable.throw(err));
  }

  put(endpoint, body): Observable<any> {

    return super.put(this.getUrl(endpoint), body, this.getOptions())
      .catch((err) => Observable.throw(err));
  }

  delete(endpoint): Observable<any> {

    return super.delete(this.getUrl(endpoint), this.getOptions())
      .catch((err) => Observable.throw(err));
  }

  /** Get authKeys in headers for all requests */
  private getOptions(): RequestOptionsArgs {
    return { headers: this.config.getAuth() };
  }

  /** Serialize url endpoint and queryArgs */
  private getUrl(endpoint: string, args?): string {

    let url = this.config.baseUrl + endpoint;
    if (args) {
      /** add args to url */
      url += '?' + Helper.serialize(args);
    }
    return url;
  }

}
