import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IbuInfoPage } from './ibu-info.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: IbuInfoPage}]),
    ComponentsModule,
    CommonModule,
  ],
  declarations: [IbuInfoPage]
})
export class IbuInfoPageModule {}
