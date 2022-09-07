import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnauthorizedGuard} from './shared/guards/unauthorized.guard';
import {AuthorizedGuard} from './shared/guards/authorized.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
        canActivate: [UnauthorizedGuard]
    },
    {
        path: '',
        loadChildren: () => import('./modules/authorized-layout/authorized-layout.module').then(m => m.AuthorizedLayoutModule),
        canActivate: [AuthorizedGuard]
    },
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
