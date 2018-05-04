import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ComponentsModule} from "../../components/components.module";
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class HomePageModule {}
