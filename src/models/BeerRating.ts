/**
 * BeerRating.ts
 *
 * Created by jake
 * Created on 3/1/18
 *
 * Model the beer rating.
 */


export default interface BeerRating {
  uuid:string;
  rating: number;
  description: string;
  created_at: Date;
  user: string;
  beer:string;
}
