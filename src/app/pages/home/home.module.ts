import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'home', component: HomePage}]),
    ComponentsModule,
    DirectivesModule,
    CommonModule
  ],
})
export class HomePageModule {}
