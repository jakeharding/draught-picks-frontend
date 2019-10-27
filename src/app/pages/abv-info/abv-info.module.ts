import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AbvInfoPage } from './abv-info';
// import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AbvInfoPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: AbvInfoPage}]),
    // ComponentsModule,
  ],
})
export class AbvInfoPageModule {}
