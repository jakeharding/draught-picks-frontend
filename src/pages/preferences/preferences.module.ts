import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencesPage } from './preferences';
import { AutoCompleteModule } from "ionic2-auto-complete";

@NgModule({
  declarations: [
    PreferencesPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(PreferencesPage),
  ],
})
export class PreferencesPageModule {}
