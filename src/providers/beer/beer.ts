import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from "../../env";
import {AutoCompleteService} from "ionic2-auto-complete";
import Beer from "../../models/Beer";
import PageResponse from "../../models/PageResponse";

/*
  Generated class for the BeerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeerProvider implements AutoCompleteService{
  url:string;
  labelAttribute = "name";

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}beers`
  }

  search (beerName:string) {
    return this.http.get(this.url, {params: {search: beerName }}).toPromise().then( ({ results }: PageResponse<Beer>) => {
      return results;
    });
  }

  getResults (beerName:string) {
    return this.search(beerName);
  }

}
