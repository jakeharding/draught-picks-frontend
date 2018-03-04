import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from "../../env";
import BeerRating from "../../models/BeerRating";

/*
  Generated class for the RatingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RatingProvider {

  url: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}beer-ratings`;
  }

  create(beerRating: BeerRating): Promise<BeerRating> {
    return this.http.post(this.url, beerRating).toPromise().then((rating:BeerRating) => rating);
  }

  partialUpdate(beerRating: BeerRating): Promise<BeerRating> {
    return this.http.put(`${this.url}/${beerRating.uuid}`, beerRating).toPromise().then((rating:BeerRating) => rating);
  }
}
