import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';

@Component({
  selector: 'tnt-rtl-layout-sidebar',
  templateUrl: './rtl-layout.component.html',
  styleUrls: ['./rtl-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtlLayoutSidebarComponent implements OnInit {
  constructor(private layoutService: NbLayoutDirectionService) {}

  ngOnInit(): void {
    this.layoutService.setDirection(NbLayoutDirection.RTL);
  }
}
