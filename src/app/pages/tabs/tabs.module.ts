/**
 * tabs.module.ts
 *
 * Created by jake
 * Created on 10/25/19
 */

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsPageRoutingModule } from './tabs-routing.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: TabsPage}]),
    TabsPageRoutingModule,
    ComponentsModule,
  ],
})
export class TabsModule {}
