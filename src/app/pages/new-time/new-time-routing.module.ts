import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTimePage } from './new-time.page';

const routes: Routes = [
  {
    path: '',
    component: NewTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTimePageRoutingModule {}
