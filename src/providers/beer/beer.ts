import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from "../../env";

/*
  Generated class for the BeerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeerProvider {
  url:string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}beers`
  }

  search (beerName:string) {
    return this.http.get(this.url, {params: {search: beerName }}).toPromise();
  }

}
