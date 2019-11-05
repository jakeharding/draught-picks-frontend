import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerDetailPage } from './beer-detail';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BeerDetailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: BeerDetailPage}]),
    ComponentsModule,
    CommonModule,
    FormsModule,
  ],
})
export class BeerDetailPageModule {}
