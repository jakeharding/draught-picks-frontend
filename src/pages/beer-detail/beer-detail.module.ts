import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerDetailPage } from './beer-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BeerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerDetailPage),
    ComponentsModule,
  ],
})
export class BeerDetailPageModule {}
