import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SignInPage } from './sign-in';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: 'signiin', component: SignInPage}]),
    ComponentsModule,
  ],
})
export class SignInPageModule {}



