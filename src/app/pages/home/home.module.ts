import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'home', component: HomePage}]),
    ComponentsModule,
    CommonModule,
    FormsModule
  ],
})
export class HomePageModule {}
