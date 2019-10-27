import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ResendEmailPage } from './resend-email';
// import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ResendEmailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'resent-email', component: ResendEmailPage}]),
    // ComponentsModule,
  ],
})
export class ResendEmailPageModule {}
