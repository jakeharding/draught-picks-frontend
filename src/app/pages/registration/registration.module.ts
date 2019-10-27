import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegistrationPage } from './registration';
// import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegistrationPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'registration', component: RegistrationPage}]),
    // ComponentsModule,
  ],
})
export class RegistrationPageModule {}
