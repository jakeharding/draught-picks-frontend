import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerListComponent } from './beer-list/beer-list';
import { BeerItemComponent } from './beer-item/beer-item';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating';
import { DraughtHeaderComponent } from './draught-header/draught-header';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [BeerListComponent,
    BeerItemComponent,
    RatingComponent,
    DraughtHeaderComponent],
  imports: [
    IonicModule, CommonModule, RouterModule
  ],
  exports: [BeerListComponent,
    BeerItemComponent,
    RatingComponent,
    DraughtHeaderComponent]
})
export class ComponentsModule {}
