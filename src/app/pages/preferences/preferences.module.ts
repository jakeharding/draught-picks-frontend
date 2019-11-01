import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PreferencesPage } from './preferences';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IbupagePageModule } from '../ibupage/ibupage.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  declarations: [
    PreferencesPage
  ],
  imports: [
    // AutoCompleteModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'preferences',
        component: PreferencesPage
      },
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    IbupagePageModule,
    FormsModule,
    AutoCompleteModule
  ],
})
export class PreferencesPageModule {}
