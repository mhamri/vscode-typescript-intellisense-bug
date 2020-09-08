// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { NgModule } from '@angular/core';
import {
  DefaultUrlSerializer,
  RouterModule,
  Routes,
  UrlSerializer,
  UrlTree,
} from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './services/auth-guard.service';
import { Utilities } from './services/utilities';
// import { NotFoundComponent } from './@theme/pages/not-found/not-found.component';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Home' },
  },
  {
    path: 'auth',
    loadChildren: () => import('./@Auth/auth.module').then((x) => x.AuthModule),
  },
  // { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Settings' },
  },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: 'Page Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
  ],
})
export class AppRoutingModule {}
