import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as Env } from '../../../environments/environment';
import Beer from '../../models/Beer';
import PageResponse from '../../models/PageResponse';
import { LIMIT } from '../../directives/infinite-scroller/infinite-scroller';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoCompleteService } from 'ionic4-auto-complete';
/*
  Generated class for the BeerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class BeerProvider implements AutoCompleteService {
  url: string;
  recentsUrl: string;
  recommendedUrl: string;
  labelAttribute = 'name'; // Attribute needed for the AutoCompleteService
  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}/beers`;
    this.recentsUrl = `${Env.REST_API_ROOT}/recent-beers`;
    this.recommendedUrl = `${Env.REST_API_ROOT}/recommended-beers`;
  }

  /**
   * search function
   * Parameters: Observable of type Beer list
   * Sets the limit and offset for the infinite scrolling
   */
  search(params: any): Observable<Beer[]> {
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    return this.http.get(this.url, {params}).pipe(map(({results}: PageResponse<Beer>) => results));
  }

  /**
   * Method called in auto complete search bar.
   * @param beerName - Name of beer
   * @returns - List of beers
   */
  getResults(beerName: string) {
    if (beerName) {
      return this.search({search: beerName});
    }
    return EMPTY;
  }

  /**
   * recents function
   * Parameters: Observable of type Beer list
   * Sets the limit and offset for the infinite scrolling
   */
  recents(params: any): Observable<Beer[]> {
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }

    return this.http.get(this.recentsUrl, {params}).pipe(map(({results}: PageResponse<Beer>) => results));
  }

  /**
   * recommended function
   * Parameters: query params for pagination
   * Retrieves a page of recommended beers for an authenticated user.
   */
  recommended(params: any): Observable<Beer[]> {
    if (!params.limit) {
      params.limit = LIMIT;
    }
    if (!params.offset) {
      params.offset = 0;
    }
    return this.http.get(this.recommendedUrl, {params})
      .pipe(map(({results}: PageResponse<Beer>) => results));
  }

  /**
   * createRecent function
   * Parameters: Beer
   * returns the recent beer list
   */
  createRecent(recent: Beer) {
    return this.http.post(this.recentsUrl, {beer: recent.uuid}).toPromise();
  }

  /**
   * Retrieve a information about a beer.
   * @param uuid - ID of beer
   * @returns - Promise a beer
   */
  retrieve(uuid: string) {
    return this.http.get(`${this.url}/${uuid}`).toPromise();
  }


}
