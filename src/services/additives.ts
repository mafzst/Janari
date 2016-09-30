import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/first';

@Injectable()

export class additivesService {
  constructor(private http: Http) {
  }

  getAdditive(ecode): Observable<any> {
    return this.http.get(`http://api.npsi-informatique.fr/api/additives?filter=%7B%22where%22%3A%20%7B%22code%22%3A%20%22${ecode}%22%7D%7D`)
      .first();
  }
}
