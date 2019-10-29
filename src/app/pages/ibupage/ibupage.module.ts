import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IbupagePage } from './ibupage';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    IbupagePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: IbupagePage}]),
    ComponentsModule,
    CommonModule,
  ],
})
export class IbupagePageModule {}
