import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbSecurityModule } from '@nebular/security';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbMenuModule,
  NbSelectModule,
  NbUserModule,
  NbLayoutModule,
} from '@nebular/theme';
import { HeaderComponent } from './header.component';
import { LayoutService } from './layout.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    NbSelectModule,
    NbIconModule,
    NbSecurityModule,
    NbContextMenuModule,
    NbMenuModule,
    NbLayoutModule
  ],
  exports: [HeaderComponent],
  providers: [{ provide: LayoutService, useClass: LayoutService }],
})
export class HeaderModule {}
