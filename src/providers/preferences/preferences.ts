import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Env from '../../env';
import PageResponse from '../../models/PageResponse';
import UserPreferences from '../../models/UserPreferences';

/**
 * Generated class for the PreferencesProvider provider.
 *
 * See https://angular.io/guide/dependency-injection for more info on providers
 * and Angular DI.
**/
@Injectable()
export class PreferencesProvider {
  url: string;

  constructor(public http: HttpClient) {
    this.url = `${Env.REST_API_ROOT}/preferences`;
  }

  /**
   * retrieve function
   * No Parameters
   * Gets the userPreferences and returns the result
   * */
  retrieve (): Promise<UserPreferences> {
    return this.http.get(this.url).toPromise().then(({ results }:PageResponse<UserPreferences>) => {
      return results[0];
    });
  }

  /**
   * save function
   * Prefs ArrayList of type UserPReferences
   * Returns User Preferences
   * */
  save(prefs: UserPreferences) {
    if (prefs.uuid && prefs.uuid.length > 1) {
      // If prefs has uuid it already exists in DB
      return this.http.put(`${this.url}/${prefs.uuid}`, prefs).toPromise();
    } else {
      // Create it
      return this.http.post(this.url, prefs).toPromise();
    }
  }
}
