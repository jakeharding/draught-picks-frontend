import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IbupagePage } from './ibupage';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    IbupagePage,
  ],
  imports: [
    IonicPageModule.forChild(IbupagePage),
    ComponentsModule,
  ],
})
export class IbupagePageModule {}
