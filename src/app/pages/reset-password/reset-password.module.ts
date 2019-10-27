import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ResetPasswordPage } from './reset-password';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'reset-password', component: ResetPasswordPage}]),
  ],
})
export class ResetPasswordPageModule {}
