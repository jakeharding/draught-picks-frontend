import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailSentPage } from './email-sent';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    EmailSentPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailSentPage),
    ComponentsModule,
  ],
})
export class EmailSentPageModule {}
