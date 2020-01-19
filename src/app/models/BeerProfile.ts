/**
 * BeerProfile.ts
 *
 * Created by jake
 * Created on 2/27/18
 *
 * Model beer profiles.
 *
 */
// tslint:disable:variable-name
export default class BeerProfile {
  uuid: string;
  abv_low: string;
  abv_hi: string;
  ibu_low: string;
  ibu_hi: string;
  like_description: string;
  user: string;

  constructor() {

  }
}
