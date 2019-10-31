import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerFavoriteInfoPage } from './beer-favorite-info';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BeerFavoriteInfoPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: BeerFavoriteInfoPage}]),
    ComponentsModule,
  ],
})
export class BeerFavoriteInfoPageModule {}
