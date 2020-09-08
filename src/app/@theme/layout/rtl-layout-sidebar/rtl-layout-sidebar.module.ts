import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { RtlLayoutComponent } from './rtl-layout-sidebar.component';

const NB_MODULES = [NbLayoutModule, NbSidebarModule.forRoot()];

const DECLARATIONS = [RtlLayoutComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, ...NB_MODULES],
  exports: [...DECLARATIONS],
})
export class RtlLayoutSidebarModule {}
