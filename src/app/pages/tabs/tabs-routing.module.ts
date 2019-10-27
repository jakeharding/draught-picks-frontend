/**
 * tabs-routing.module.ts
 *
 * Created by jake
 * Created on 10/25/19
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: '',
          children:
            [
              {
                path: '',
                loadChildren: '../search/search.module#SearchPageModule'
              }
            ]
        },
        {
          path: '',
          children:
            [
              {
                path: '',
                loadChildren: '../home/home.module#HomePageModule'
              }
            ]
        },
        {
          path: '',
          children:
            [
              {
                path: '',
                loadChildren: '../preferences/preferences.module#PreferencesPageModule'
              },
              {path: 'preferences/ibu-info', loadChildren: '../ibupage/ibupage.module#IbupagePageModule'}
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule {}
