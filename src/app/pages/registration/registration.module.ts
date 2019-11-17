import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegistrationPage } from './registration';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component: RegistrationPage,
    }]),
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationPageModule {}
