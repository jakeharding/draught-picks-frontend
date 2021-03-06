/**
 * tabs-routing.module.ts
 *
 * Created by jake
 * Created on 10/25/19
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs';
import { AuthProvider } from '../../services/auth/auth';

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
              { path: '', loadChildren: '../search/search.module#SearchPageModule' },
              { path: 'search/beer/:uuid', loadChildren: '../beer-detail/beer-detail.module#BeerDetailPageModule' },

            ]
        },
        {
          path: '',
          children:
            [
              { path: '', loadChildren: '../home/home.module#HomePageModule' },
              { path: 'home/beer/:uuid', loadChildren: '../beer-detail/beer-detail.module#BeerDetailPageModule' },

            ]
        },
        {
          path: '',
          children:
            [
              { path: '', loadChildren: '../beer-profile/beer-profile.module#BeerProfilePageModule' },
              { path: 'beer-profile/ibu-info', loadChildren: '../ibu-info/ibu-info.module#IbuInfoPageModule' },
              { path: 'beer-profile/abv-info', loadChildren: '../abv-info/abv-info.module#AbvInfoPageModule' },
              {
                path: 'beer-profile/beer-favorite-info',
                loadChildren: '../beer-favorite-info/beer-favorite-info.module#BeerFavoriteInfoPageModule'
              },
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
