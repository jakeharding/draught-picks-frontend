import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerDetailPage } from './beer-detail';

@NgModule({
  declarations: [
    BeerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerDetailPage),
  ],
})
export class BeerDetailPageModule {}
