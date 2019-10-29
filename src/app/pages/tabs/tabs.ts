import { Component } from '@angular/core';
import { BasePage } from '../BasePage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends BasePage {
  constructor() { super('tabs'); }
}
