import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BeerProfilePage } from './beer-profile.page';
import { ComponentsModule } from '../../components/components.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([
      {
        path: 'beer-profile',
        component: BeerProfilePage
      },
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule
  ],
  declarations: [BeerProfilePage]
})
export class BeerProfilePageModule {}
