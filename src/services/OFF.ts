import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/first';

@Injectable()
export class OFFService {
    constructor(private http: Http) {
    }

    getProduct(productCode): Observable<any> {
        return this.http.get(`http://world.openfoodfacts.org/api/v0/product/${productCode}.json`)
            .first();
    }
}
