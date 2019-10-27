import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DisclaimerPage } from './disclaimer';
// import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DisclaimerPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'disclaimer', component: DisclaimerPage}])
    // ComponentsModule,
  ],
})
export class DisclaimerPageModule {}
