import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {PreferencesPage} from "../preferences/preferences";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContactPage;
  tab2Root = HomePage;
  tab3Root = PreferencesPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
