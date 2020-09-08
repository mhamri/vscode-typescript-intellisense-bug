import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { Subject, from } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {
  destroy$= new Subject();
  constructor(private authService: NbAuthService, private router: Router) {}

  ngOnInit(): void {

    this.authService
      .logout('ioauth')
      .pipe(
        takeUntil(this.destroy$),
        switchMap((x) => from(this.router.navigateByUrl('/')))
      )
      .subscribe();

  }
}
