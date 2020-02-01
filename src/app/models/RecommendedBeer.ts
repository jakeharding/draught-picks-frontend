/**
 * RecommendedBeer.ts
 *
 * Created by jake
 * Created on 2/1/20
 */

export default interface RecommendedBeer {
  uuid: string;
  user: string;
  beer: string;
  created_at: Date;
  percent_match: string;
  agreed: boolean;
}
