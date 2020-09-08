// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbMenuModule, NbThemeModule, NbLayoutModule, NbSidebarModule, NbLayoutDirection } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AuthModule } from './@Auth/auth.module';
import { RtlLayoutModule } from './@theme/layout/rtl-layout/rtl-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';
import { RoleEditorComponent } from './components/controls/role-editor.component';
import { RolesManagementComponent } from './components/controls/roles-management.component';
import { SearchBoxComponent } from './components/controls/search-box.component';
import { TodoDemoComponent } from './components/controls/todo-demo.component';
import { UserInfoComponent } from './components/controls/user-info.component';
import { UserPreferencesComponent } from './components/controls/user-preferences.component';
import { UsersManagementComponent } from './components/controls/users-management.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { EqualValidator } from './directives/equal-validator.directive';
import { LastElementDirective } from './directives/last-element.directive';
import { GroupByPipe } from './pipes/group-by.pipe';
import { AccountEndpoint } from './services/account-endpoint.service';
import { AccountService } from './services/account.service';
import { AlertService } from './services/alert.service';
import { AppTitleService } from './services/app-title.service';
import { AuthStorage } from './services/auth-storage';
import { ConfigurationService } from './services/configuration.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { NotificationService } from './services/notification.service';
import { ThemeManager } from './services/theme-manager';

const MINE = [RtlLayoutModule];
const NB = [
  OAuthModule.forRoot(),
  NbThemeModule.forRoot({ name: 'default' },null, null, NbLayoutDirection.RTL),

  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
];
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    NbEvaIconsModule,
    AuthModule,
    ...MINE,
    ...NB,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    SettingsComponent,
    UsersManagementComponent,
    UserInfoComponent,
    UserPreferencesComponent,
    RolesManagementComponent,
    RoleEditorComponent,

    NotFoundComponent,
    NotificationsViewerComponent,
    SearchBoxComponent,
    TodoDemoComponent,
    EqualValidator,
    LastElementDirective,
    AutofocusDirective,

    GroupByPipe,
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: OAuthStorage, useClass: AuthStorage },
    AlertService,
    ThemeManager,
    ConfigurationService,
    AppTitleService,

    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
