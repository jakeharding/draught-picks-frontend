/**
 * BasePage.ts
 *
 * Created by jake
 * Created on 9/28/18
 */
import ga from 'universal-ga'

export class BasePage {
  constructor (page:string) {
    ga.set(location.hash, location.hash);
    ga.pageview(page);
  }
}