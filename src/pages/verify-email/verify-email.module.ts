import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyEmailPage } from './verify-email';

@NgModule({
  declarations: [
    VerifyEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyEmailPage),
  ],
})
export class VerifyEmailPageModule {}
