import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ResendEmailPage } from './resend-email';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResendEmailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: ResendEmailPage}]),
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class ResendEmailPageModule {}
