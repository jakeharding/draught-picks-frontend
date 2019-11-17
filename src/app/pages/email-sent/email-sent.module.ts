import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EmailSentPage } from './email-sent';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EmailSentPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: EmailSentPage}]),
    ComponentsModule,
  ],
})
export class EmailSentPageModule {}
