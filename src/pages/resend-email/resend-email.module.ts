import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResendEmailPage } from './resend-email';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ResendEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ResendEmailPage),
    ComponentsModule,
  ],
})
export class ResendEmailPageModule {}
