/**
 * Beer.ts
 *
 * Created by jake
 * Created on 2/27/18
 *
 * Model the beers
 */
import BeerRating from "./BeerRating";


export default interface Beer {
  name: string;
  description: string,
  abv: number;
  ibu: number;
  uuid: string;
  api_id: string;
  name_of_api: string;
  created_at: Date;
  rating?: Array<BeerRating>;
}
