import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisclaimerPage } from './disclaimer';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DisclaimerPage,
  ],
  imports: [
    IonicPageModule.forChild(DisclaimerPage),
    ComponentsModule,
  ],
})
export class DisclaimerPageModule {}
