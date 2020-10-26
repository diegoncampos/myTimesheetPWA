import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTimePageRoutingModule } from './new-time-routing.module';

import { NewTimePage } from './new-time.page';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTimePageRoutingModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatMomentDateModule
  ],
  declarations: [NewTimePage],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class NewTimePageModule {}
