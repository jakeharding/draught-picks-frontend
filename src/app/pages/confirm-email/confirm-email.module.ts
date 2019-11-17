import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConfirmEmailPage } from './confirm-email';
// import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConfirmEmailPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: ConfirmEmailPage}]),
    ComponentsModule,
    // ComponentsModule
  ],
})
export class ConfirmEmailPageModule {}
