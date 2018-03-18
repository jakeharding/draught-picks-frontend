import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencesPage } from './preferences';
import { AutoCompleteModule } from "ionic2-auto-complete";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    PreferencesPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(PreferencesPage),
    ComponentsModule,
  ],
})
export class PreferencesPageModule {}
