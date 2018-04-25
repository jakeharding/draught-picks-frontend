import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from "../../env";
import {AutoCompleteService} from "ionic2-auto-complete";
import Beer from "../../models/Beer";
import PageResponse from "../../models/PageResponse";
import { LIMIT } from "../../directives/infinite-scroller/infinite-scroller"
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
/*
  Generated class for the BeerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeerProvider implements AutoCompleteService {
  url:string;
  recentsUrl: string;
  recommendedUrl: string;
  labelAttribute = "name"; // Attribute needed for the AutoCompleteService
  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}beers`;
    this.recentsUrl = `${Env.REST_API_ROOT}recent-beers`;
    this.recommendedUrl = `${Env.REST_API_ROOT}recommended-beers`;
  }

  search (params: any): Observable<Beer[]> {
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    return this.http.get(this.url, {params}).map(({results}: PageResponse<Beer>) => results);
  }

  /**
   * Method called in auto complete search bar.
   * @param {string} beerName
   * @returns {Observable<Beer[]>}
   */
  getResults (beerName:string) {
    return this.search({search: beerName});
  }

  recents (params: any): Observable<Beer[]> {
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }

    return this.http.get(this.recentsUrl, {params}).map(({results}: PageResponse<Beer>) => results);
  }
  recommended (params: any): Observable<Beer[]>{
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    return this.http.get(this.recommendedUrl, {params})
      .map(({results} : PageResponse<Beer>) => results);
  }

  createRecent (recent: Beer) {
    return this.http.post(this.recentsUrl, {beer: recent.uuid}).toPromise();
  }

  retrieve (uuid: string) {
    return this.http.get(`${this.url}/${uuid}`).toPromise()
  }


}
