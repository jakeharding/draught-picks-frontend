import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { PreferencesPage } from '../preferences/preferences';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = HomePage;
  tab3Root = PreferencesPage;

  constructor() {}
}
