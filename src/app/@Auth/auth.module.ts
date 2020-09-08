import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbAuthModule,
  NbAuthOptions,
  NB_AUTH_USER_OPTIONS,
} from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ConfigurationService } from '../services/configuration.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './oidc/login/login.component';
import { OidcAuthStrategy } from './oidc/oidc-auth-strategy';
import { LogoutComponent } from './oidc/logout/logout.component';
import { RtlLayoutModule } from '../@theme/layout/rtl-layout/rtl-layout.module';

export function SomeFunc(injector: Injector): NbAuthOptions {
  const configService = injector.get(ConfigurationService);
  return {
    strategies: [
      OidcAuthStrategy.setup({
        name: 'ioauth',
        clientId: 'quickapp_spa',
        clientSecret: 'not_used',
        authorize: {
          scope: 'openid email phone profile offline_access roles quickapp_api',
        },

        baseEndpoint: configService.fallbackBaseUrl,
      }),
    ],
    forms: {
      login: {
        strategy: 'ioauth',
      },
    },
  };
}

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    NbAuthModule.forRoot(),
    OAuthModule.forRoot(),
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbAlertModule,
    NbCheckboxModule,
    AuthRoutingModule,
  ],
  providers: [
    { provide: NB_AUTH_USER_OPTIONS, useFactory: SomeFunc, deps: [Injector] },
    { provide: OidcAuthStrategy, useClass: OidcAuthStrategy },
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
