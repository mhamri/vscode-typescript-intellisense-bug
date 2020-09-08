// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.authService.isAuthenticatedOrRefresh().pipe(
      tap((x) => console.log('canLoad', x)),
      switchMap((x: boolean) => {
        if (x === false) {
          return from(
            this.router.navigate(['/auth/login'], {
              queryParams: { loginRedirectUrl: url },
            })
          );
        }
        return of(true);
      })
    );
  }
}
