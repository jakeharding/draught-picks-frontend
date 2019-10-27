import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { PreferencesPage } from '../preferences/preferences';
import { SearchPage } from '../search/search';
import { BasePage } from '../BasePage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage extends BasePage {

  // tab1Root = SearchPage;
  // tab2Root = HomePage;
  // tab3Root = PreferencesPage;

  constructor() { super('tabs'); }
}
