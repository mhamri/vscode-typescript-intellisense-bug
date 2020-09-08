import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NbMenuModule, NbCardModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NbMenuModule, NbCardModule, NbButtonModule],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
