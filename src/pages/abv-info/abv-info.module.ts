import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbvInfoPage } from './abv-info';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AbvInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AbvInfoPage),
    ComponentsModule,
  ],
})
export class AbvInfoPageModule {}
