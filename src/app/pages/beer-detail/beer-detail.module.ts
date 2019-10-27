import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerDetailPage } from './beer-detail';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BeerDetailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '/beer/:uuid', component: BeerDetailPage}]),
    ComponentsModule,
  ],
})
export class BeerDetailPageModule {}
