/**
 * PageResponse.ts
 *
 * Created by jake
 * Created on 2/27/18
 *
 * Model the paginated response from the REST API.
 */


export default interface PageResponse<T> {
  count: number;
  next: number;
  previous: number;
  results: Array<T>;
}
