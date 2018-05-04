
/**
 * RecentBeer.ts
 *
 * Created by carolyn
 * Created on 4/11/18
 *
 * Model the recent beers
 */
export default interface RecentBeer {
  uuid: string;
  user: string;
  beer: string;
  created_at: Date;
}
