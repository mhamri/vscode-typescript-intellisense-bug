import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { HeaderModule } from '../header/header.module';
import { RtlLayoutComponent } from './rtl-layout.component';

const NB_MODULES = [NbLayoutModule, NbSidebarModule];

const DECLARATIONS = [RtlLayoutComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, ...NB_MODULES, HeaderModule],
  exports: [...DECLARATIONS],
})
export class RtlLayoutModule {}
