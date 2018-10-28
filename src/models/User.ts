/**
 * User.ts
 *
 * Created by jake
 * Created on 2/27/18
 *
 * Model user attributes
 */
import Beer from "./Beer";


export default interface User {
  first_name: string;
  last_name: string;
  uuid: string;
  username: string;
  password: string;
  date_of_birth: Date;
  email: string;
  weight: number;
  favorite_beers: Array<Beer>;
  rated_beers: Array<Beer>;
  recent_beers: Array<Beer>;
}
