import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerFavoriteInfoPage } from './beer-favorite-info';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    BeerFavoriteInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerFavoriteInfoPage),
    ComponentsModule,
  ],
})
export class BeerFavoriteInfoPageModule {}
