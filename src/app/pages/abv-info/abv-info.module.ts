import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AbvInfoPage } from './abv-info';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AbvInfoPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: AbvInfoPage}]),
    ComponentsModule,
  ],
})
export class AbvInfoPageModule {}
