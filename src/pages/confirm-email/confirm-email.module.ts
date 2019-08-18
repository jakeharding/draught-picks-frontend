import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmEmailPage } from './confirm-email';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConfirmEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmEmailPage),
    ComponentsModule
  ],
})
export class ConfirmEmailPageModule {}
