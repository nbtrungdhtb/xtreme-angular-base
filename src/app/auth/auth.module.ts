import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthRoutes} from './auth.routing';
import {LoginComponent} from './login/login.component';
import {NotfoundComponent} from './404/not-found.component';
import {AuthService} from './auth.service';
import {BreadcrumbService} from '../shared/breadcrumb/breadcrumb.service';


@NgModule({
    declarations: [
        LoginComponent,
        NotfoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes)
    ],
    providers: [
        AuthService,
        BreadcrumbService
    ]
})
export class AuthModule {
}
