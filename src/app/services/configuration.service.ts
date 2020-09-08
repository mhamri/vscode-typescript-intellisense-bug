import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { DBkeys } from './db-keys';
import { LocalStoreManager } from './local-store-manager.service';

import { Utilities } from './utilities';

interface UserConfiguration {
  homeUrl: string;
}

@Injectable()
export class ConfigurationService {
  constructor(private localStorage: LocalStoreManager) {
    this.loadLocalChanges();
  }

  set homeUrl(value: string) {
    this._homeUrl = value;
    this.saveToLocalStore(value, DBkeys.HOME_URL);
  }
  get homeUrl() {
    return this._homeUrl || ConfigurationService.defaultHomeUrl;
  }

  public static readonly appVersion: string = '3.0.0';

  // ***Specify default configurations here***
  public static readonly defaultLanguage: string = 'en';
  public static readonly defaultHomeUrl: string = '/';
  public static readonly defaultThemeId: number = 1;

  public baseUrl = environment.baseUrl || Utilities.baseUrl();
  public tokenUrl =
    environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
  public loginUrl = environment.loginUrl;

  // ***End of defaults***

  private _homeUrl: string = null;

  private onConfigurationImported: Subject<boolean> = new Subject<boolean>();
  configurationImported$ = this.onConfigurationImported.asObservable();

  private loadLocalChanges() {
    if (this.localStorage.exists(DBkeys.HOME_URL)) {
      this._homeUrl = this.localStorage.getDataObject<string>(DBkeys.HOME_URL);
    }
  }

  private saveToLocalStore(data: any, key: string) {
    setTimeout(() => this.localStorage.savePermanentData(data, key));
  }

  public import(jsonValue: string) {
    this.clearLocalChanges();

    if (jsonValue) {
      const importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

      if (importValue.homeUrl != null) {
        this.homeUrl = importValue.homeUrl;
      }
    }

    this.onConfigurationImported.next();
  }

  public export(changesOnly = true): string {
    const exportValue: UserConfiguration = {
      homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
    };

    return JSON.stringify(exportValue);
  }

  public clearLocalChanges() {
    this._homeUrl = null;

    this.localStorage.deleteData(DBkeys.HOME_URL);
  }
}
