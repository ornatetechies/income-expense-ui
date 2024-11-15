import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import {TokenInterceptor} from "./login/shared/TokenInterceptor";
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CurrencyPipe} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        RegisterFormComponent,
        RegisterComponent,
        LoginFormComponent,
        LoginComponent,
        DashboardComponent,
        HeaderComponent,
        SideNavComponent,
        IncomeExpensesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }

    ],  bootstrap: [AppComponent]
})
export class AppModule { }
