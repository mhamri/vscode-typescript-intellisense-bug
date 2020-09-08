import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  deepExtend,
  NbAuthJWTToken,
  NbAuthResult,
  NbAuthStrategyClass,
  NbOAuth2AuthStrategy,
  NbOAuth2AuthStrategyOptions,
} from '@nebular/auth';
import { NB_WINDOW } from '@nebular/theme';
import { OAuthService } from 'angular-oauth2-oidc';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';

@Injectable()
export class OidcAuthStrategy extends NbOAuth2AuthStrategy {
  static setup(
    options: NbOAuth2AuthStrategyOptions
  ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [OidcAuthStrategy, options];
  }

  discoverSettings: any;

  constructor(
    protected http: HttpClient,
    protected route: ActivatedRoute,
    protected oauthService: OAuthService,
    @Inject(NB_WINDOW) protected window: any
  ) {
    super(http, route, window);
    console.log(this.options);
  }

  private readonly _discoveryDocUrl: string =
    '/.well-known/openid-configuration';

  setOptions(options: any): void {
    this.options = deepExtend({}, this.defaultOptions, options);
    this.oauthService.configure({
      issuer: this.getOption('baseEndpoint'),
      requireHttps: false,
      clientId: this.getOption('clientId'),
    });

    from(
      this.oauthService.loadDiscoveryDocument(
        this.getOption('baseEndpoint') + this._discoveryDocUrl
      )
    )
      .pipe(share())
      .subscribe((x) => console.log('sub', x));
    // console.log(this.getOption)
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'login';
    console.log(data);
    var that = this;

    return from(
      this.oauthService.fetchTokenUsingPasswordFlow(
        data['email'],
        data['password']
      )
    ).pipe(
      map((res) => {
        if (this.getOption(`${module}.alwaysFail`)) {
          throw this.createFailResponse(data);
        }
        return res;
      }),
      map((res) => {
        console.log('response', res);

        return new NbAuthResult(
          true,
          res,
          '/home',
          [],
          // this.getOption('messages.getter')(module, res, this.options),
          'success',
          this.createToken<NbAuthJWTToken>(res, true)
        );
      }),
      catchError((res) => {
        console.error(res);
        return throwError(res);
        // return this.handleResponseError(res, module);
      })
    );
  }

  // logout(): Observable<NbAuthResult>{

  //   return null;
  // }
}
