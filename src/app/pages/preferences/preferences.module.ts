import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PreferencesPage } from './preferences';
// import { AutoCompleteModule } from 'ionic2-auto-complete';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IbupagePageModule } from '../ibupage/ibupage.module';

@NgModule({
  declarations: [
    PreferencesPage
  ],
  imports: [
    // AutoCompleteModule,
    IonicModule,
    RouterModule.forChild([
      { path: 'preferences',
        component: PreferencesPage
      },
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    IbupagePageModule
  ],
})
export class PreferencesPageModule {}
