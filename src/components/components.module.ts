import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerListComponent } from './beer-list/beer-list';
import { BeerItemComponent } from './beer-item/beer-item';
import {IonicModule} from "ionic-angular";
import { RatingComponent } from './rating/rating';
@NgModule({
	declarations: [BeerListComponent,
    BeerItemComponent,
    RatingComponent],
	imports: [
    IonicModule, CommonModule,
	],
	exports: [BeerListComponent,
    BeerItemComponent,
    RatingComponent]
})
export class ComponentsModule {}
