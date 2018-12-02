/**
 * BasePage.ts
 *
 * Created by jake
 * Created on 9/28/18
 */
import ga from 'universal-ga';

export abstract class BasePage {
  protected constructor (page:string) {
    ga.set(location.pathname, location.pathname);
    ga.pageview(page);
  }

  isClientError(statusCode:number) {
    return statusCode >= 400 && statusCode < 500;
  }
}
