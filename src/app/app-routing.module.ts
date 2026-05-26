import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: '/login', pathMatch: 'full', },

                    //         { path: 'production',  data: {breadcrumb: 'Production'},loadChildren: () => import('./planner/production/production.module').then(m => m.ProductionModule) }
                    { path: 'master', data: { breadcrumb: 'Master' }, loadChildren: () => import('./tracks/master/master.module').then(m => m.MasterModule) },
                    { path: 'tracks', data: { breadcrumb: 'Tracks' }, loadChildren: () => import('./tracks/tracks.module').then(m => m.TracksModule) },
                    { path: 'reports', data: { breadcrumb: 'Reports' }, loadChildren: () => import('./tracks/reports/reports.module').then(m => m.ReportsModule) }

                ]
            },

            { path: 'login', component: LoginComponent },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
