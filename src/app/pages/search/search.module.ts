import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: 'search', component: SearchPage}]),
    ComponentsModule,
    DirectivesModule,
    FormsModule,
    CommonModule
  ],
})
export class SearchPageModule {}
