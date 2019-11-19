import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as Env } from '../../../environments/environment';
import PageResponse from '../../models/PageResponse';
import BeerProfile from '../../models/BeerProfile';

/**
 * Generated class for the BeerProfileProvider provider.
 *
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
 */
@Injectable({
  providedIn: 'root',
})
export class BeerProfileProvider {
  url: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}/preferences`;
  }

  /**
   * retrieve function
   * No Parameters
   * Gets the beer profile and returns the result
   */
  retrieve(): Promise<BeerProfile> {
    return this.http.get(this.url).toPromise().then(({ results }: PageResponse<BeerProfile>) => {
      return results[0];
    });
  }

  /**
   * save function
   * Returns Beer Profile
   */
  save(profile: BeerProfile) {
    if (profile.uuid && profile.uuid.length > 1) {
      // If profile has uuid it already exists in DB
      return this.http.put(`${this.url}/${profile.uuid}`, profile).toPromise();
    } else {
      // Create it
      return this.http.post(this.url, profile).toPromise();
    }
  }
}
