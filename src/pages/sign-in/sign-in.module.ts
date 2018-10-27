import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
    ComponentsModule,
  ],
})
export class SignInPageModule {}



