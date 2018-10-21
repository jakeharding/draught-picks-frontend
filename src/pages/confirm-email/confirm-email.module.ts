import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmEmailPage } from './confirm-email';

@NgModule({
  declarations: [
    ConfirmEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmEmailPage),
  ],
})
export class ConfirmEmailPageModule {}
