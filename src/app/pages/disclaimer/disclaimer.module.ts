import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DisclaimerPage } from './disclaimer';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DisclaimerPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: DisclaimerPage}]),
    ComponentsModule,
  ],
})
export class DisclaimerPageModule {}
