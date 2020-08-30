import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTimePageRoutingModule } from './new-time-routing.module';

import { NewTimePage } from './new-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTimePageRoutingModule
  ],
  declarations: [NewTimePage]
})
export class NewTimePageModule {}
