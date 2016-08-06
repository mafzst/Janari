import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class OFFService {
  constructor(private http: Http){}

  getProduct(productCode) {
    let product = this.http.get(`http://world.openfoodfacts.org/api/v0/product/${productCode}.json`);
    return product;
  }

  getCategory(category) {
    let products = this.http.get(`http://world.openfoodfacts.org/cgi/suggest.pl?lc=fr&tagtype=categories&string=${category}&page_size=20`)
    return products;
  }
}
