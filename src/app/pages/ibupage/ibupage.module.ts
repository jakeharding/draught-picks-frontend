import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IbupagePage } from './ibupage';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IbupagePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: IbupagePage}]),
    ComponentsModule,
  ],
})
export class IbupagePageModule {}
